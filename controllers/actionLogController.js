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

async function getAllActionLogs(req, res) {
    try {
        const logs = await ActionLog.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch action logs', error: error.message });
    }
}

async function getActionLogsBySectionId(req, res) {
    try {
        const { sectionId } = req.params;
        const logs = await ActionLog.find({ sectionId });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch action logs by section ID', error: error.message });
    }
}

module.exports = { logAction, getAllActionLogs, getActionLogsBySectionId };
