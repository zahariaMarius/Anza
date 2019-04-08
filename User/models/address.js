const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  country: {type: String, required: true, lowercase: true},
  city: {type: String, required: true, lowercase: true},
  street: {type: String, required: true, lowercase: true},
  number: {type: String, required: true, unique: true, lowercase: true},
  province: {type: String, required: true, lowercase: true},
  postalCode: {type: String, required: true, lowercase: true},
  mobilePhone: {
    prefix: {type: Number, required: true},
    number: {type: Number, required: true}
  },
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
});

module.exports = mongoose.model('address', addressSchema);
