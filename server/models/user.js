const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User}
