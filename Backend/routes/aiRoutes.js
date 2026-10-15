const express = require('express');
const { generateContent } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', protect, authorize('Author', 'Admin'), generateContent);

module.exports = router;
