const mongoose = require('mongoose');

const leavesSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  requestedDate: Date,
  requestedUserEmail: String,
  status: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
    default: 'Pending',
  },
});

const Leaves = mongoose.model('Leaves', leavesSchema);

module.exports = Leaves;
