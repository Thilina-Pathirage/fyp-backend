const express = require('express');
const router = express.Router();

const { registerUser, loginUser, startWorkTime, stopWorkTime, updateUserMLData, getAllUsers, getUserDataByEmail } = require('../controllers/userController');



// Create a new endpoint for updating user data with ML results
router.post('/take-survey', updateUserMLData);

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Start work time tracking
router.post('/start-work-time', startWorkTime);

// Stop work time tracking
router.post('/stop-work-time', stopWorkTime);

// Add a new route to get all users
router.get('/all-users', getAllUsers);

// Add a new route to get user data by email
router.get('/by-email/:email', getUserDataByEmail);


module.exports = router;
