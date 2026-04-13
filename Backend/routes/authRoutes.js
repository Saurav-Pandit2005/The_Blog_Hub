const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  updateDetails, 
  updateAvatar, 
  updatePassword,
  forgotPassword,
  verifyOtp,
  resetPassword 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/updateavatar', protect, upload.single('profilePic'), updateAvatar);

// Forgot Password Flow
router.post('/forgotpassword', forgotPassword);
router.post('/verifyotp', verifyOtp);
router.put('/resetpassword', resetPassword);

module.exports = router;
