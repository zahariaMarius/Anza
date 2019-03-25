const router = require('express').Router();
const controller = require('../controllers/auth');

router
  .route('/')
  .get(controller.verifyAuthorization);

module.exports = router;
