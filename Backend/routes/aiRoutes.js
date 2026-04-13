const express = require('express');
const { generateContent } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Only logged-in authors or admins can use AI features
router.post('/generate', protect, authorize('Author', 'Admin'), generateContent);

module.exports = router;
