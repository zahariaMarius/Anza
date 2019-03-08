const Joi = require('joi');

module.exports = {

  /**
   * User validation schema on signup
   */
  userSignupSchema: Joi.object().keys({
    name: Joi.string().regex(/^[A-Za-z\s]+$/).required(),
    surname: Joi.string().regex(/^[A-Za-z\s]+$/).required(),
    birth: Joi.date().min('1-1-1894').max('now').required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&._])[A-Za-z\d@$!%?&._]{8,}$/)
  }),

  /**
   * User validation schema on update
   */
  userUpdateSchema: Joi.object().keys({
    name: Joi.string().regex(/^[A-Za-z\s]+$/),
    surname: Joi.string().regex(/^[A-Za-z\s]+$/),
    birth: Joi.date().min('1-1-1894').max('now'),
    gender: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&._])[A-Za-z\d@$!%?&._]{8,}$/)
  }),

  /**
   * User validation schema on patch pwd
   */
  userPatchPassword: Joi.object().keys({
    oldPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&._])[A-Za-z\d@$!%?&._]{8,}$/).required(),
    newPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&._])[A-Za-z\d@$!%?&._]{8,}$/).required()
  })

};
