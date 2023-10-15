// routes/LeavesRoutes.js

const express = require('express');
const router = express.Router();
const { createLeave, getAllLeaves, getLeavesByUser, updateLeaveStatus, deleteLeave, getLeavesByStatus } = require('../controllers/leavesController');

// Create a new leave request
router.post('/create', createLeave);

// Get all leave requests
router.get('/all', getAllLeaves);

// Get leave requests by user
router.get('/by-user/:userEmail', getLeavesByUser);

// Update leave request status
router.put('/update/:id', updateLeaveStatus);

// Delete a leave request by its ID
router.delete('/delete/:id', deleteLeave);

// Get leave requests by status
router.get('/all-by-status/:status', getLeavesByStatus);

module.exports = router;
