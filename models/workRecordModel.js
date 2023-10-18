const mongoose = require('mongoose');

const workRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String, // Store the date as a string (e.g., '2023-10-10')
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    default: null,
  },
});

const WorkRecord = mongoose.model('WorkRecord', workRecordSchema);

module.exports = WorkRecord;
