/**
 * Module dependencies.
 */
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const app = express();

/**
 * connect MongoDB server
 */
mongoose.connect('mongodb://127.0.0.1:27017/user', {useNewUrlParser: true}).then(
  () => { console.log('MongoDB is connected') },
  err => { console.log(err) }
);

/**
 * Set app use Module dependencies
 */
app.use(logger('dev'));

/**
 * Export Module dependencies.
 */
module.exports = app;

