/**
 * Module dependencies.
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const loginRoutes = require('./routes/login');
const authRoutes = require('./routes/auth');

/**
 * connect MongoDB server
 */
mongoose.connect('mongodb://127.0.0.1:27017/userservice', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}).then(
  () => { console.log('MongoDB is connected') },
  err => { console.log(err) }
);

/**
 * setting header of the app for handling cors error
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('X-Powered-By', 'Express');
  res.header('X-Version', '1.0.0');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


/**
 * Set app use Module dependencies
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
/**
 * Set app use Routes
 */
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);
/**
 * Export Module dependencies.
 */
module.exports = app;

