const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/normalController');
const { protect, authorize } = require('../middleware/auth');

// Allow Visitors explicitly
router.use(protect);
router.use(authorize('Visitor'));

router.get('/stats', getStats);

module.exports = router;
