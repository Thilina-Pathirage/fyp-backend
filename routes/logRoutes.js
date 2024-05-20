const express = require('express');
const router = express.Router();

const {getAllActionLogs, getActionLogsBySectionId} = require('../controllers/actionLogController');


// Routes for action logs
router.get('/get-all', getAllActionLogs);
router.get('/by-section-id/:sectionId', getActionLogsBySectionId);

module.exports = router;
