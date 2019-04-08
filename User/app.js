/**
 * Module dependencies.
 */
const conf = require('./conf/conf').mongodbConf;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

/**
 * connect MongoDB server
 */
mongoose.connect('mongodb://' + conf.address + ':' + conf.port +  '/userservice', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}).then(
  () => { console.log('===> MongoDB successfully connected <===') },
  err => { console.log('===> Error while connecting MongoDB <==='); console.log(err)}
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
app.use('/user', userRoutes);

/**
 * Export Module dependencies.
 */
module.exports = app;

