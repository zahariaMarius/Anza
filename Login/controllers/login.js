const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.localLogin = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({email: req.body['user'].email}, 'active password');
    if (!user) return res.status(401).json({status: 401, message: 'Email is wrong'});
    const validPwd = await bcrypt.compare(req.body['user'].password, user.password);
    if (!validPwd) return res.status(401).json({status: 401, message: 'Password is wrong'});
    if (!user.active) return res.status(401).json({status: 401, message: 'User email is not active'});
    const token = await jwt.sign({
      iss: 'Anza-Server',
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, 'secret');
    res.json({status: 200, message: 'OK', results: {accessToken: token}});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
