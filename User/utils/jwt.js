const jwt = require('jsonwebtoken');
const config = require('../configuration/conf');

module.exports = {

  signToken: async (sub, exp) => {
    return jwt.sign({
      iss: 'Anza-Server',
      sub: sub._id,
      iat: new Date().getTime(),
      exp: exp
    }, config.jwtSecret);
  }

};
