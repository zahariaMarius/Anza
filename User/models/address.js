const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  country: {type: String, required: true},
  city: {type: String, required: true},
  street: {type: String, required: true},
  number: {type: String, required: true, unique: true},
  province: {type: String, required: true},
  postalCode: {type: String, required: true},
  mobilePhone: {
    prefix: {type: Number, required: true},
    number: {type: Number, required: true, unique: true}
  },
  landlinePhone: {
    prefix: {type: Number, required: true},
    number: {type: Number, required: true, unique: true}
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
});

module.exports = mongoose.model('address', addressSchema);
