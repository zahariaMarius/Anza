const conf = require('../conf/conf');
const mongoose = require('mongoose');
const AddressModel = require('../models/address');
const UserModel = require('../models/user');

exports.addNewAddress = async (req, res, next) => {
  try {
    //check if user_id is valid
    const user = await UserModel.findById(req.params['user_id']);
    if (!user) return res.status(404).json({status: 404, message: 'Invalid user'});

    const addressBody = req.body['address'];
    const addressDoc = new AddressModel({
      _id: new mongoose.Types.ObjectId(),
      country: addressBody.country,
      city: addressBody.city,
      street: addressBody.street,
      number: addressBody.number,
      province: addressBody.province,
      postalCode: addressBody.postalCode,
      mobilePhone: addressBody.mobilePhone,
      user_id: req.params['user_id']
    });
    const address = await AddressModel.create(addressDoc);
    res.status(201).json({status: 201, message: 'Address successfully created', results: {address: address}});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }

};

exports.getAddressById = async (req, res, next) => {
  try {
    const address = await AddressModel.findById(req.params['address_id'], '-__v -user_id');
    if (!address) return res.status(404).json({status: 404, message: 'Address not found'});
    res.json({status: 200, message: 'OK', results: {address: address}});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.getAllAddressesByUserId = async (req, res, next) => {
  try {
    const id = req.params['user_id'];

    const x = await AddressModel.
    find({ user_id: id}).populate('user_id');

    console.log(x);

    //const allAddress = AddressModel.find({user_id: id}).populate('user_id');
    //console.log(allAddress);
    //res.json(allAddress);
    //if (!addresses) return res.status(404).json({status: 404, message: 'Address not found'});
    //res.json({status: 200, message: 'OK', results: {address: addresses}});
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }

};

exports.updateAddressById = async (req, res, next) => {};
