const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdUserEmail: String,
});

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;
