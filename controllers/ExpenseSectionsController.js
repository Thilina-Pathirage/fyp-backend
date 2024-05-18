const ExpenseSection = require('../models/expSecModel');

// Create a new expense section
async function createExpenseSection(req, res) {
    try {
        const { secTitle, userEmail } = req.body;

        const newExpenseSection = new ExpenseSection({
            secTitle,
            userEmail,
            expenseList: []
        });

        await newExpenseSection.save();

        res.status(201).json({ message: 'Expense section created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense section', error: error.message });
    }
}

// Update an expense section's title by its ID
async function updateExpenseSectionTitleById(req, res) {
    try {
        const { id } = req.params;
        const { secTitle } = req.body;

        const updatedExpenseSection = await ExpenseSection.findByIdAndUpdate(
            id,
            { secTitle },
            { new: true }
        );

        if (!updatedExpenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        res.status(200).json({ message: 'Expense section title updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense section title', error: error.message });
    }
}

// Delete an expense section by its ID
async function deleteExpenseSectionById(req, res) {
    try {
        const { id } = req.params;

        const deletedExpenseSection = await ExpenseSection.findByIdAndRemove(id);

        if (!deletedExpenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        res.status(200).json({ message: 'Expense section deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete expense section', error: error.message });
    }
}

// Get all expense sections
async function getAllExpenseSections(req, res) {
    try {
        const expenseSections = await ExpenseSection.find();

        res.status(200).json(expenseSections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expense sections', error: error.message });
    }
}

// Get expense sections by user email
async function getExpenseSectionsByEmail(req, res) {
    try {
        const { userEmail } = req.params;
        const expenseSections = await ExpenseSection.find({ userEmail });

        res.status(200).json(expenseSections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expense sections by user email', error: error.message });
    }
}


// Get a single expense section by its ID
async function getSingleSectionById(req, res) {
    try {
        const { id } = req.params;

        const expenseSection = await ExpenseSection.findById(id);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        res.status(200).json(expenseSection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expense section', error: error.message });
    }
}

module.exports = { createExpenseSection, updateExpenseSectionTitleById, deleteExpenseSectionById, getAllExpenseSections, getExpenseSectionsByEmail, getSingleSectionById };
