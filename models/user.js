const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
 name:{
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3,
  },
  email:{
    type: String,
    required: true,
    maxlength: 50,
    minlength:5
  },
  username:{
    type: String,
    required: true,
    maxlength: 30
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
