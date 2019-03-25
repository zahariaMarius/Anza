const router = require('express').Router();
const controller = require('../controllers/user');
const bodyValidation = require('../middleware/bodyValidation');
const joiSchemas = require('../utils/joiSchemas');
const auth = require('../middleware/auth');

router
  .route('/:user_id')
  .get(auth, controller.getUserById)
  .put(bodyValidation.validate(joiSchemas.userUpdate), controller.updateUserById)
  .patch(bodyValidation.validate(joiSchemas.userPatchPwd), controller.patchUserPwd);

router
  .route('/signup')
  .post(bodyValidation.validate(joiSchemas.userSignup), controller.signupUser);

router
  .route('/activate/:user_token')
  .get(controller.activateUser);

router
  .route('/activate/:user_id')
  .patch(controller.refreshActivationToken);

module.exports = router;
