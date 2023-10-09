const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String, // Store hashed password
  userRole: String,
  position: String,
  mentalHealthStatus: String,
  workStatus: String,
  // Add any other fields or validations as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
