const express = require('express');
const router = express.Router();
const {
  createExpenseSection,
  updateExpenseSectionTitleById,
  deleteExpenseSectionById,
  getAllExpenseSections,
  getExpenseSectionsByEmail,
  getSingleSectionById,
  addUserToSection,
  removeUserFromSection, 
  getUsersBySectionId
} = require('../controllers/ExpenseSectionsController');

const {
  createExpenseBySectionId,
  updateExpenseByExpenseSectionID,
  deleteExpenseByExpenseSectionID,
  updatePaidStatusByExpenseSectionID,
} = require('../controllers/ExpensesController');

// Expense section routes
router.post('/expense-section/create', createExpenseSection);
router.put('/expense-section/update/:id', updateExpenseSectionTitleById);
router.delete('/expense-section/delete/:id', deleteExpenseSectionById);
router.get('/expense-section/all', getAllExpenseSections);
router.get('/expense-section/by-user/:userEmail', getExpenseSectionsByEmail);
router.get('/expense-section/by-id/:id', getSingleSectionById);
// Add user to a specific expense section
router.post('/expense-section/add-user/:sectionId', addUserToSection);
router.delete('/expense-section/remove-user/:sectionId/', removeUserFromSection);
router.get('/expense-section/users/:sectionId', getUsersBySectionId);

// Expense routes
router.post('/expense/create/:id', createExpenseBySectionId);
router.put('/expense/update/:sectionId/:expenseId', updateExpenseByExpenseSectionID);
router.delete('/expense/delete/:sectionId/:expenseId', deleteExpenseByExpenseSectionID);
router.put('/expense/update-paid-status/:sectionId/:expenseId', updatePaidStatusByExpenseSectionID);

module.exports = router;
