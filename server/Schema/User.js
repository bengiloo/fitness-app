const mongoose = require('mongoose');

// User Schema:
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });


// Creating user model:
const User = mongoose.model('User', userSchema, 'User Data');

module.exports = User;