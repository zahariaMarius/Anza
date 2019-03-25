const jwt = require('jsonwebtoken');

exports.verifyAuthorization = async (req, res, next) => {
  try {
    const valid = await jwt.verify(req.headers['authorization'].split(' ')[1], 'secret');
    res.json({status: 200, message: 'OK'});
  } catch (e) {
    res.status(401).json({status: 401, message: 'Token not valid'});
    console.log(e.message);
  }
};
