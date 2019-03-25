const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String},
  password: {type: String},
  active: {type: Boolean},
});

module.exports = mongoose.model('user', userSchema);
