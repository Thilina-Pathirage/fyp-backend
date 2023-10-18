const express = require('express');
const router = express.Router();
const { registerUser, loginUser, startWorkTime, stopWorkTime } = require('../controllers/userController');

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Start work time tracking
router.post('/start-work-time', startWorkTime);

// Stop work time tracking
router.post('/stop-work-time', stopWorkTime);

module.exports = router;
