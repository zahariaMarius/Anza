const router = require('express').Router();
const controller = require('../controllers/user');
const joiValidation = require('../middleware/joiValidation');
const joiSchemas = require('../utils/joiSchemas');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router
  .route('/:user_id')
  .get(controller.getUserById)
  .put(joiValidation.validate(joiSchemas.userUpdateSchema), controller.updateUserById)
  .patch(joiValidation.validate(joiSchemas.userPatchPassword), controller.patchUserPwd);

router
  .route('/signup')
  .post(joiValidation.validate(joiSchemas.userSignupSchema), controller.signupUser);

module.exports = router;
