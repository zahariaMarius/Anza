const Joi = require('joi');
const regexp = require('../conf/conf').regexp;
const moment = require('moment');

const minData = moment().subtract(120, 'years').format('YYYY-MM-DD');
const maxData = moment().subtract(16, 'years').format('YYYY-MM-DD');

module.exports = {

/**
   * User validation schema on signup
   */
  userSignup: Joi.object().keys({
    name: Joi.string().regex(regexp.nameSurname).required(),
    surname: Joi.string().regex(regexp.nameSurname).required(),
    birth: Joi.date().min(minData).max(maxData).required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(regexp.pwd).required()
  }),

  /**
   * User validation schema on update
   */
  userUpdate: Joi.object().keys({
    name: Joi.string().regex(regexp.nameSurname),
    surname: Joi.string().regex(regexp.nameSurname),
    birth: Joi.date().min(minData).max(maxData),
    gender: Joi.string(),
  }),

  /**
   * User validation schema on patch pwd
   */
  userPatchPwd: Joi.object().keys({
    oldPassword: Joi.string().regex(regexp.pwd).required(),
    newPassword: Joi.string().regex(regexp.pwd).required()
  })

};
