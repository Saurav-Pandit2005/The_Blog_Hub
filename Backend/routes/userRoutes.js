const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', upload.single('profilePic'), updateProfile);

module.exports = router;
