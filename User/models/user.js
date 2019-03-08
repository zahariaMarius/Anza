const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true, lowercase: true},
  surname: {type: String, required: true, lowercase: true},
  birth: {type: Date, required: true},
  gender: {type: String, required: true, lowercase: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  temporarytoken: {type: String, required: true},
  active: {type: Boolean, required: true, default: false},
  signedup: {type: Date, default: Date.now},
});

module.exports = mongoose.model('user', userSchema);


