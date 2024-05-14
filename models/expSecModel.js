const mongoose = require('mongoose');

// Define schema for expenses
const expenseSchema = new mongoose.Schema({
  expTitle: String,
  expValue: Number,
  paidStatus: { type: Boolean, default: false }
});

// Define schema for expense sections
const expenseSectionSchema = new mongoose.Schema({
  secTitle: String,
  userEmail: String,
  expenseList: [expenseSchema] // Embedding expense schema inside expense section
});

// Expense Section model
const ExpenseSection = mongoose.model('ExpenseSection', expenseSectionSchema);

module.exports = ExpenseSection;
