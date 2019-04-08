const router = require('express').Router();
const userController = require('../controllers/user');
const addressController = require('../controllers/address');
const bodyValidation = require('../middleware/bodyValidation');
const joiSchemas = require('../utils/joiSchemas');
const auth = require('../middleware/auth');


//user routes
router
  .route('/:user_id')
  .get(auth, userController.getUserById)
  .put(auth, bodyValidation.validate(joiSchemas.userUpdate), userController.updateUserById)
  .patch(auth, bodyValidation.validate(joiSchemas.userPatchPwd), userController.patchUserPwd);

router
  .route('/signup')
  .post(bodyValidation.validate(joiSchemas.userSignup), userController.signupUser);

router
  .route('/activate/:user_token')
  .get(userController.activateUser);

router
  .route('/activate/:user_id')
  .patch(userController.refreshActivationToken);

//address routes
router
  .route('/:user_id/address')
  .get(addressController.getAllAddressesByUserId)
  .post(addressController.addNewAddress);

router
  .route('/:user_id/address/:address_id')
  .get(addressController.getAddressById)
  .put(addressController.updateAddressById);



module.exports = router;
