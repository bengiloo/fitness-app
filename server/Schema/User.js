const mongoose = require('mongoose');

// User Schema:
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, // User's name
    lastname: { type: String, required: true }, // lastname
    email: { type: String, required: true, unique: true }, // email
    password: { type: String, required: true } // password
  });


// Creating the user model:
const User = mongoose.model('User', userSchema, 'User Data'); // User Data is our collection in db

module.exports = User;