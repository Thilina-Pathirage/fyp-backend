const ExpenseFactory = require('../factories/expSecFactory');
const ExpenseSection = require('../models/expSecModel');

async function createExpenseBySectionId(req, res) {
    try {
        const { id } = req.params;
        const { expTitle, expValue, paidStatus } = req.body;

        const expenseSection = await ExpenseSection.findById(id);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        const newExpense = ExpenseFactory.createExpense({ expTitle, expValue, paidStatus }); // Corrected method call
        expenseSection.expenseList.push(newExpense);
        await expenseSection.save();

        res.status(201).json({ message: 'Expense created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense', error: error.message });
    }
}
// Update an expense by section ID and expense ID
async function updateExpenseByExpenseSectionID(req, res) {
    try {
        const { sectionId, expenseId } = req.params;
        const { expTitle, expValue } = req.body;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        const expense = expenseSection.expenseList.id(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expense.expTitle = expTitle;
        expense.expValue = expValue;


        await expenseSection.save();

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
}

async function deleteExpenseByExpenseSectionID(req, res) {
    try {
        const { sectionId, expenseId } = req.params;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Find the index of the expense in the expenseList array
        const index = expenseSection.expenseList.findIndex(expense => expense._id.equals(expenseId));

        // If expense not found, return 404 error
        if (index === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Remove the expense from the array
        expenseSection.expenseList.splice(index, 1);

        // Save the expense section to persist the changes
        await expenseSection.save();

        // Respond with success message
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        // If any error occurs during the process, return 500 error
        res.status(500).json({ message: 'Failed to delete expense', error: error.message });
    }
}


// Update paid status of an expense by section ID and expense ID
async function updatePaidStatusByExpenseSectionID(req, res) {
    try {
        const { sectionId, expenseId } = req.params;
        const { paidStatus } = req.body;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        const expense = expenseSection.expenseList.id(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expense.paidStatus = paidStatus;

        await expenseSection.save();

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
}

module.exports = { createExpenseBySectionId, updateExpenseByExpenseSectionID, deleteExpenseByExpenseSectionID, updatePaidStatusByExpenseSectionID };
