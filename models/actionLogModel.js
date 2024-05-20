const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseSection' },
  action: String,
  userEmail: String,
  timestamp: { type: Date, default: Date.now }
});

const ActionLog = mongoose.model('ActionLog', actionLogSchema);

module.exports = ActionLog;
