const mongoose = require('mongoose');

// Define the main categories for expenses
const categories = [
  'Housing', 'Transportation', 'Food', 'Utilities', 'Healthcare', 'Insurance',
  'Entertainment', 'Travel', 'Personal Care', 'Item Purchases', 'Clothing', 'Education',
  'Gifts & Donations', 'Debt Payments', 'Savings & Investments', 'Miscellaneous', 'Others'
];

// Define schema for expenses
const expenseSchema = new mongoose.Schema({
  expTitle: { type: String, required: true },
  expValue: { type: Number, required: true },
  paidStatus: { type: Boolean, default: false },
  category: { type: String, enum: categories} // Adding category field with enum
});

// Define schema for user emails
const emailSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  userRole: { type: String, default: 'user' } // Add userRole field with default value 'user'
});

// Define schema for expense sections
const expenseSectionSchema = new mongoose.Schema({
  secTitle: { type: String, required: true },
  userEmails: [emailSchema],
  expenseList: [expenseSchema] // Embedding expense schema inside expense section
});

// Expense Section model
const ExpenseSection = mongoose.model('ExpenseSection', expenseSectionSchema);

module.exports = ExpenseSection;
