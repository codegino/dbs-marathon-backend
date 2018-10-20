const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {Admin}
