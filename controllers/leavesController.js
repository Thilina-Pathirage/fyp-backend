const Leaves = require('../models/leavesModel');

// Create a new leave request
async function createLeave(req, res) {
    try {
        const { startDate, endDate, requestedDate, requestedUserEmail, reason } = req.body;

        const newLeave = new Leaves({
            startDate,
            endDate,
            requestedDate,
            requestedUserEmail,
            reason
        });

        await newLeave.save();

        res.status(201).json({ message: 'Leave request created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create leave request', error: error.message });
    }
}

// Get all leave requests
async function getAllLeaves(req, res) {
    try {
        const leaves = await Leaves.find();

        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leave requests', error: error.message });
    }
}

// Get leave requests by user email
async function getLeavesByUser(req, res) {
    try {
        const { userEmail } = req.params;
        const leaves = await Leaves.find({ requestedUserEmail: userEmail });

        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leave requests by user', error: error.message });
    }
}

// Update the status of a leave request
async function updateLeaveStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedLeave = await Leaves.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.status(200).json({ message: 'Leave request status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave request status', error: error.message });
    }
}

// Delete a leave request by its ID
async function deleteLeave(req, res) {
    try {
        const { id } = req.params;

        const deletedLeave = await Leaves.findByIdAndRemove(id);

        if (!deletedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete leave request', error: error.message });
    }
}

async function getLeavesByStatus(req, res) {
    try {
        const { status } = req.params;

        if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const leaves = await Leaves.find({ status });

        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leave requests by status', error: error.message });
    }
}

async function updateLeave(req, res) {
    try {
        const { id } = req.params;
        const { startDate, endDate, reason } = req.body;

        const updatedLeave = await Leaves.findByIdAndUpdate(
            id,
            { startDate, endDate, reason },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.status(200).json({ message: 'Leave request updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave request', error: error.message });
    }
}


module.exports = { createLeave, getAllLeaves, getLeavesByUser, updateLeaveStatus, deleteLeave, getLeavesByStatus, updateLeave };
