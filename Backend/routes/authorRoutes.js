const express = require('express');
const { getAuthorStats, getMyBlogs } = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('Author', 'Admin'));

router.get('/stats', getAuthorStats);
router.get('/blogs', getMyBlogs);

module.exports = router;
