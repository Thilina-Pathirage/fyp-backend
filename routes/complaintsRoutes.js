const express = require('express');
const router = express.Router();
const {
  createComplaint,
  deleteComplaint,
  updateComplaint,
  getAllComplaints,
  getComplaintsByUserEmail,
} = require('../controllers/complaintsController');

// Create a new complaint
router.post('/create', createComplaint);

// Delete a complaint by its ID
router.delete('/delete/:id', deleteComplaint);

// Update a complaint's title and description by its ID
router.put('/update/:id', updateComplaint);

// Get all complaints
router.get('/all', getAllComplaints);

// Get complaints by user email
router.get('/by-user/:userEmail', getComplaintsByUserEmail);

module.exports = router;
