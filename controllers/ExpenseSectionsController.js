const ExpenseFactory = require('../factories/expSecFactory');
const ExpenseSection = require('../models/expSecModel');
const User = require('../models/usersModel');

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



// Create a new expense section
async function createExpenseSection(req, res) {
    try {
        const { secTitle, userEmail } = req.body;

        // Create the new expense section object with the first user as an admin
        const newExpenseSectionData = ExpenseFactory.createExpenseSection({
            secTitle,
            userEmail
        });

        // Initialize a new ExpenseSection document
        const newExpenseSection = new ExpenseSection(newExpenseSectionData);

        // Save the new expense section
        await newExpenseSection.save();

        // Log the action
        await logAction(newExpenseSection._id, 'create', userEmail);

        res.status(201).json({ message: 'Expense section created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense section', error: error.message });
    }
}

// Get expense sections by user email
async function getExpenseSectionsByEmail(req, res) {
    try {
        const { userEmail } = req.params;
        const expenseSections = await ExpenseSection.find({ 'userEmails.userEmail': userEmail });

        res.status(200).json(expenseSections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expense sections by user email', error: error.message });
    }
}

// Add a user to a specific expense section by section ID
async function addUserToSection(req, res) {
    try {
        const { sectionId } = req.params;
        const { email, loggedInUserEmail } = req.body;

        // Find the expense section by ID
        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // Find the logged-in user
        const loggedInUser = await User.findOne({ email: loggedInUserEmail });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        // Check if the logged-in user has admin role for the section
        const loggedInUserInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!loggedInUserInExpenseSection || loggedInUserInExpenseSection.userRole !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Check if the provided email is already associated with the section
        const existingUser = expenseSection.userEmails.find(user => user.userEmail === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if the provided email exists in the list of all users
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the new email to the userEmails array
        expenseSection.userEmails.push(ExpenseFactory.createEmail({ userEmail: email }));

        // Save the updated expense section
        await expenseSection.save();

        // Log the action
        await logAction(sectionId, 'addUser', loggedInUserEmail);

        res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Remove a user from a specific expense section by section ID
async function removeUserFromSection(req, res) {
    try {
        const { sectionId } = req.params;
        const { email, loggedInUserEmail } = req.body;

        // Find the expense section by ID
        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // Find the logged-in user
        const loggedInUser = await User.findOne({ email: loggedInUserEmail });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        // Check if the logged-in user has admin role for the section
        const loggedInUserInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!loggedInUserInExpenseSection || loggedInUserInExpenseSection.userRole !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Check if the provided email exists in the list of users for the section
        const userToRemove = expenseSection.userEmails.find(user => user.userEmail === email);
        if (!userToRemove) {
            return res.status(400).json({ message: 'User not found in section' });
        }

        // If the user to be removed is an admin and the logged-in user is not the same as the user to be removed,
        // block the removal
        if (userToRemove.userRole === 'admin') {
            return res.status(403).json({ message: 'Cannot remove admin user' });
        }

        // Remove the user from the userEmails array
        expenseSection.userEmails = expenseSection.userEmails.filter(user => user.userEmail !== email);

        // Save the updated expense section
        await expenseSection.save();

        // Log the action
        await logAction(sectionId, 'removeUser', loggedInUserEmail);

        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// List all users associated with a specific expense section by section ID
async function getUsersBySectionId(req, res) {
    try {
        const { sectionId } = req.params;

        // Find the expense section by ID
        const expenseSection = await ExpenseSection.findById(sectionId);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // Return the list of users for the section
        res.status(200).json({ users: expenseSection.userEmails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




// Update an expense section's title by its ID
async function updateExpenseSectionTitleById(req, res) {
    try {
        const { id } = req.params;
        const { secTitle, loggedInUserEmail } = req.body;

        // Find the logged-in user
        const loggedInUser = await User.findOne({ email: loggedInUserEmail });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        // Find the expense section by ID
        const expenseSection = await ExpenseSection.findById(id);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user has admin role for the section
        const loggedInUserInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!loggedInUserInExpenseSection || loggedInUserInExpenseSection.userRole !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update the expense section's title
        await ExpenseSection.findByIdAndUpdate(
            id,
            { secTitle },
            { new: true }
        );

        // Log the action
        await logAction(id, 'updateTitle', loggedInUserEmail);

        res.status(200).json({ message: 'Title updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update', error: error.message });
    }
}

// Delete an expense section by its ID
async function deleteExpenseSectionById(req, res) {
    try {
        const { id, loggedInUserEmail } = req.params;

        // Find the logged-in user
        const loggedInUser = await User.findOne({ email: loggedInUserEmail });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        // Find the expense section by ID
        const expenseSection = await ExpenseSection.findById(id);

        if (!expenseSection) {
            return res.status(404).json({ message: 'Expense section not found' });
        }

        // Check if the logged-in user has admin role for the section
        const loggedInUserInExpenseSection = expenseSection.userEmails.find(user => user.userEmail === loggedInUserEmail);
        if (!loggedInUserInExpenseSection || loggedInUserInExpenseSection.userRole !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete the expense section
        await ExpenseSection.findByIdAndRemove(id);

        // Log the action
        await logAction(id, 'delete', loggedInUserEmail);

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
// async function getExpenseSectionsByEmail(req, res) {
//     try {
//         const { userEmail } = req.params;
//         const expenseSections = await ExpenseSection.find({ userEmail });

//         res.status(200).json(expenseSections);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch expense sections by user email', error: error.message });
//     }
// }


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

module.exports = { createExpenseSection, updateExpenseSectionTitleById, deleteExpenseSectionById, getAllExpenseSections, getExpenseSectionsByEmail, getSingleSectionById, addUserToSection, removeUserFromSection, getUsersBySectionId };
