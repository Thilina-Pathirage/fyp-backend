const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  mentalHealthStatus: {
    type: Object,
    default: {  // Set the default value here
      prediction: "Normal",
      recommendations: [],
    },
  },
  workStatus: {
    type: String,
  },
  workRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkRecord',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
