const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

module.exports = mongoose.model('Admin', adminSchema);