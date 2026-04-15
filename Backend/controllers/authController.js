const User = require('../models/User');
const { uploadToCloudinary } = require('../middleware/upload');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 */
exports.register = async (req, res, next) => {
  const { name, username, email, password, role } = req.body;
  try {
    // 🛡️ SECURITY: Prevent anyone from registering as an Admin
    if (role === 'Admin') {
      return res.status(400).json({ success: false, error: 'Cannot register as an Admin user.' });
    }

    const user = await User.create({ name, username, email, password, role });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/**
 * @desc    Log in an existing user
 * @route   POST /api/v1/auth/login
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error during login.' });
  }
};

// @desc    Get current logged in user
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

// @desc    Update user details
exports.updateDetails = async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    username: req.body.username,
    bio: req.body.bio,
    profilePic: req.body.profilePic
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: user });
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
exports.updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }

    // Force explicit hashing to avoid Mongoose hook bugs
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    
    // We disable validation here just to be safe during save 
    // since we already passed the middleware checks
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update user avatar
exports.updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image file' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, 'avatars');

    const user = await User.findByIdAndUpdate(req.user.id, {
      profilePic: result.secure_url
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user,
      profilePic: result.secure_url
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Gould not upload image. Try again.' });
  }
};

// Helper function to send token and response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      website: user.website,
      twitter: user.twitter,
      profilePic: user.profilePic,
    },
  });
};

/* ========================================================
   ================ OTP FORGOT PASSWORD ===================
   ======================================================== */

const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Generate OTP and send to Email
// @route   POST /api/v1/auth/forgotpassword
exports.forgotPassword = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'There is no user with that email' });
    }

    // Generate 6 digit pin
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Assign to user and save (15 minutes expiry)
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpire = Date.now() + 15 * 60 * 1000;
    
    // Disable validation just to save token
    await user.save({ validateBeforeSave: false });

    // Send email
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \n\n Your OTP is: ${otp}\n\nIt is valid for 15 minutes.`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset OTP - The Blog Hub',
      message: message,
      html: `<h2>Password Reset</h2><p>Your OTP is going to expire in 15 minutes.</p><h1 style="background:#f4f4f4;padding:10px;text-align:center;letter-spacing:5px;">${otp}</h1>`
    });

    res.status(200).json({ success: true, message: 'OTP sent to email. Please check your inbox.' });
  } catch (err) {
    console.log(err);
    // Reset fields if email fails
    if (user) {
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpire = undefined;
        await user.save({ validateBeforeSave: false });
    }
    return res.status(500).json({ success: false, error: 'Failed to send the email. Please try again later.' });
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/auth/verifyotp
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    // Find user with matching email and OTP that hasn't expired yet
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordOtpExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or Expired OTP' });
    }

    res.status(200).json({ success: true, message: 'OTP Verified successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
};

// @desc    Reset Password using Verified OTP
// @route   PUT /api/v1/auth/resetpassword
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordOtpExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or Expired request. Start over.' });
    }

    // Set new password directly as plaintext.
    // Mongoose's .pre('save') hook will take care of the hashing!
    user.password = newPassword;
    
    // Clear OTP fields
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;
    
    // Call save to trigger the hashing hook
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful. Please login with your new password.' });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};
