const Joi = require('joi');

module.exports = {

  /**
   * Validate entry req.body data
   */
  validate: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body['user'], schema, {abortEarly: false});
      if (result.error) {
        return res.json({error: result.error.details});
      }
      next();
    }
  }

};
