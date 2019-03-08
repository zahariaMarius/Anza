const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const emailer = require('../utils/emailer');
const jwt = require('../utils/jwt');

/**
 * Get user document by user_ID
 */
exports.getUserById = async (req, res) => {
  try {
    //search user by _id into DB
    const user = await UserModel.findById(req.params['user_id'], '-password -__v');
    if (!user) {
      return res.status(404).json({error: 'User not found!'});
    }
    res.json({user: user});
  } catch (e) {
    console.log(e);
  }
};

/**
 * Update user's information
 */
exports.updateUserById = async (req, res) => {
  try {
    //search user by _id and update it with body params
    const user = await UserModel.findByIdAndUpdate(req.params['user_id'], req.body['user'], {select: '-password -__v', new: true});
    if (!user) {
      return res.json({error: 'User not found!'});
    }
    res.json({user: user});
  } catch (e) {
    console.log(e);
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
    if (!user) {
      return res.status(404).json({error: 'User not found!'});
    }
    //compare oldPassword with current password
    const valid = await bcrypt.compare(req.body['user'].oldPassword, user.password);
    if (!valid) {
      return res.status(403).json({error: 'Current password is wrong!'});
    }
    //upadte user password
    user.password = await bcrypt.hash(req.body['user'].newPassword, 13);
    await user.save();
    res.json({message: 'Password successfully changed!'});
  } catch (e) {
    console.log(e)
  }
};

/**
 * Create new User document and save into MongoDB
 */
exports.signupUser = async (req, res, next) => {
  //Create user document from body req
  const userBody = req.body['user'];
  const userDoc = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    name: userBody.name,
    surname: userBody.surname,
    birth: userBody.birth,
    gender: userBody.gender,
    email: userBody.email,
    password: userBody.password,
  });

  try {
    //check if user already exist
    const user = await UserModel.findOne({email: userDoc.email});
    //if the user already exist, exit with message
    if (user) {
      res.status(403).json({error: 'User already exist!'});
    } else {
      //if the user not exist: hash pwd and create temporaryToken
      userDoc.password = await bcrypt.hash(userDoc.password, 13);
      userDoc.temporarytoken = await jwt.signToken(userDoc, new Date().setDate(new Date().getDate() + 1));
      //save userDoc into dbS
      await UserModel.create(userDoc);
      // send mail with defined transport object
      const info = await emailer.transporter.sendMail(emailer.mailOptions(userDoc));
      console.log("Message sent: %s", info.messageId);
      res.json({message: 'User successfully saved!'});
    }
  } catch (e) {
    console.log(e);
  }

};

