const express = require('express');
const { getAuthorStats, getMyBlogs, getMyResources } = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Author-only access
router.use(protect);
router.use(authorize('Author', 'Admin'));

router.get('/stats', getAuthorStats);
router.get('/blogs', getMyBlogs);
router.get('/resources', getMyResources);

module.exports = router;
