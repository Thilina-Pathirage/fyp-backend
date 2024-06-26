const ExpenseFactory = require('../factories/expSecFactory');
const ExpenseSection = require('../models/expSecModel');

const ActionLog = require('../models/actionLogModel');
const ActionLogFactory = require('../factories/actionLogFactory');

async function logAction(sectionId, action, userEmail) {
    try {
        const newLog = ActionLogFactory.createActionLog({ sectionId, action, userEmail });
        await ActionLog.create(newLog);
    } catch (error) {
        console.error('Failed to log action:', error.message);
    }
}

async function createExpenseBySectionId(req, res) {
    try {
        const { id } = req.params;
        const { expTitle, expValue, paidStatus, loggedInUserEmail } = req.body;

        const expenseSection = await ExpenseSection.findById(id);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user is associated with the section
        const userInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!userInExpenseSection) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const newExpense = ExpenseFactory.createExpense({ expTitle, expValue, paidStatus });
        expenseSection.expenseList.push(newExpense);
        await expenseSection.save();

        // Log the action
        await logAction(id, `createExpense: ${expTitle} (Paid: ${paidStatus})`, loggedInUserEmail);

        res.status(201).json({ message: 'Expense created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense', error: error.message });
    }
}

async function updateExpenseByExpenseSectionID(req, res) {
    try {
        const { sectionId, expenseId } = req.params;
        const { expTitle, expValue, loggedInUserEmail } = req.body;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user is associated with the section
        const userInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!userInExpenseSection) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const expense = expenseSection.expenseList.id(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expense.expTitle = expTitle;
        expense.expValue = expValue;

        await expenseSection.save();

        // Log the action
        await logAction(sectionId, `updateExpense: ${expTitle}`, loggedInUserEmail);

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
}

async function deleteExpenseByExpenseSectionID(req, res) {
    try {
        const { sectionId, expenseId, loggedInUserEmail } = req.params;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user is associated with the section
        const userInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!userInExpenseSection) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Find the index of the expense in the expenseList array
        const index = expenseSection.expenseList.findIndex(expense => expense._id.equals(expenseId));

        // If expense not found, return 404 error
        if (index === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Extract the expense title before removing it
        const expTitle = expenseSection.expenseList[index].expTitle;

        // Remove the expense from the array
        expenseSection.expenseList.splice(index, 1);

        // Save the expense section to persist the changes
        await expenseSection.save();

        // Log the action
        await logAction(sectionId, `deleteExpense: ${expTitle}`, loggedInUserEmail);

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
        const { paidStatus, loggedInUserEmail } = req.body;

        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user is associated with the section
        const userInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!userInExpenseSection) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const expense = expenseSection.expenseList.id(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        expTitle = expense.expTitle;

        expense.paidStatus = paidStatus;
        await expenseSection.save();

        // Log the action
        await logAction(sectionId, `updatePaidStatus:${expTitle} (Paid status to: ${paidStatus})`, loggedInUserEmail);

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
}

module.exports = {
    createExpenseBySectionId,
    updateExpenseByExpenseSectionID,
    deleteExpenseByExpenseSectionID,
    updatePaidStatusByExpenseSectionID
};
