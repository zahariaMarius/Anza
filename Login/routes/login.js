const router = require('express').Router();
const controller = require('../controllers/login');

router
  .route('/')
  .post(controller.localLogin);


module.exports = router;
