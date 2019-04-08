const conf = require('../conf/conf');
const mongoose = require('mongoose');
const UserModel = require('../models/user');
const emailer = require('../utils/emailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Get user document by user_ID
 */
exports.getUserById = async (req, res) => {
  try {
    //search user by _id into DB
    const user = await UserModel.findById(req.params['user_id'], '-active -activationtoken -password -__v');
    if (!user) return res.status(404).json({status: 404, message: 'User not found!'});
    res.json({status: 200, message: 'OK', results: {user: user}});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

/**
 * Update user's information
 */
exports.updateUserById = async (req, res) => {
  try {
    //search user by _id and update it with body params
    const user = await UserModel.findByIdAndUpdate(req.params['user_id'], req.body['user'], {select: '-password -__v', new: true});
    if (!user) return res.status(404).json({status: 404, message: 'User not found'});
    res.json({status: 200, message: 'User successfully updated', results: user});
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
};

/**
 * Change user's pwd
 */
exports.patchUserPwd = async (req, res) => {
  //get user pwd by _id
  try {
    //get user by _id
    const user = await UserModel.findById(req.params['user_id']);
    if (!user) return res.status(404).json({status: 404, message: 'User not found'});
    //compare oldPassword with current password
    const valid = await bcrypt.compare(req.body['user'].oldPassword, user.password);
    if (!valid) return res.status(401).json({status: 401, message: 'Current password is wrong'});
    //upadte user password
    user.password = await bcrypt.hash(req.body['user'].newPassword, 13);
    await user.save();
    res.json({status: 200, message: 'Password successfully changed'});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

/**
 * Create new User document and save into MongoDB
 */
exports.signupUser = async (req, res, next) => {
  try {
    //Create user document from body req
    const userBody = req.body['user'];
    const userDoc = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name: userBody.name,
      surname: userBody.surname,
      birth: userBody.birth,
      gender: userBody.gender,
      email: userBody.email,
      password: userBody.password
    });
    //check if user already exist
    const user = await UserModel.findOne({email: userDoc.email});
    //if the user already exist, exit with message
    if (user) {
      return res.json({status: 200, message: 'User already exist!'});
    } else {
      //if the user not exist: hash pwd and create temporaryToken
      userDoc.password = await bcrypt.hash(userDoc.password, 13);

      userDoc.activationtoken = await jwt.sign({
        iss: 'Anza-Server',
        sub: userDoc._id,
        iat: new Date().getTime(),
        //exp: Math.floor(Date.now() / 1000) - 30
        exp: new Date().setDate(new Date().getDate() + 1)
      }, conf.jwtSecret);

      //save userDoc into dbS
      await UserModel.create(userDoc);
      // send mail with defined transport object
      const info = await emailer.transporter.sendMail(emailer.activateEmailOptions(userDoc));
      console.log("Message sent: %s", info.messageId);
      res.status(201).json({status: 201, message: 'User successfully created'});
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

/**
 * Activate user account using a valid activation-token
 */

exports.activateUser = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.params['user_token'], conf.jwtSecret);
    const user = await UserModel.findById(decoded.sub);
    if (!user) return res.status(404).json({status: 404, message: 'User not found'});
    user.activationtoken = false;
    user.active = true;
    await user.save();
    const emailInfo = emailer.transporter.sendMail(emailer.activateEmailSuccessOptions(user));
    console.log("Message sent: %s", emailInfo.messageId);
    res.json({status: 200, message: 'User account successfully activated'});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

/**
 * Refresh user account activation-token
 */
exports.refreshActivationToken = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params['user_id']);
    if (!user) return res.status(404).json({status: 404, message: 'User not found'});
    user.activationtoken = await jwt.sign({iss: 'Anza-Server', sub: user._id}, conf.jwtSecret, {expiresIn: '2d'});
    await user.save();
    const emailInfo = emailer.transporter.sendMail(emailer.activateEmailOptions(user));
    res.json({status: 200, message: 'User activation token successfully refreshed'});
    console.log(emailInfo.messageId);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
