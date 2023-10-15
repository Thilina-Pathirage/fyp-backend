// controllers/ComplaintsController.js

const Complaints = require('../models/complaintsModel');

// Create a new complaint
async function createComplaint(req, res) {
    try {
        const { title, description, createdUserEmail } = req.body;

        const newComplaint = new Complaints({
            title,
            description,
            createdUserEmail,
        });

        await newComplaint.save();

        res.status(201).json({ message: 'Complaint created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create complaint', error: error.message });
    }
}

// Delete a complaint by its ID
async function deleteComplaint(req, res) {
    try {
        const { id } = req.params;

        const deletedComplaint = await Complaints.findByIdAndRemove(id);

        if (!deletedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete complaint', error: error.message });
    }
}
// Update a complaint's title and description by its ID
async function updateComplaint(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedComplaint = await Complaints.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update complaint', error: error.message });
    }
}
// Get all complaints
async function getAllComplaints(req, res) {
    try {
        const complaints = await Complaints.find();

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaints', error: error.message });
    }
}

// Get complaints by user email
async function getComplaintsByUserEmail(req, res) {
    try {
        const { userEmail } = req.params;
        const complaints = await Complaints.find({ createdUserEmail: userEmail });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaints by user email', error: error.message });
    }
}

module.exports = { createComplaint, deleteComplaint, updateComplaint, getAllComplaints, getComplaintsByUserEmail };
