const express = require('express');
const { getFeedback, addFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/feedbacks', getFeedback);
router.post('/submit-feedback', addFeedback);

module.exports = router;