const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdByUserEmail: {
    type: String,
    required: true,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
