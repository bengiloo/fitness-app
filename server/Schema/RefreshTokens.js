const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user
  refreshToken: { type: String, required: true },  // The refresh token string
  createdAt: { type: Date, default: Date.now },  // Timestamp of when the token was created
  expiresAt: { type: Date, required: true }  // Expiration date of the token
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;