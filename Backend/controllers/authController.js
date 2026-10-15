const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { uploadToCloudinary } = require('../middleware/upload');
const { fail, pick, errorMessage } = require('../utils/helpers');

const OTP_VALID_MINUTES = 15;

const sendTokenResponse = (user, statusCode, res) => {
  res.status(statusCode).json({
    success: true,
    token: user.getSignedJwtToken(),
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

// Find a user whose reset OTP matches and has not expired
const findUserByValidOtp = (email, otp) =>
  User.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpire: { $gt: Date.now() },
  });

/**
 * @route POST /api/v1/auth/register
 */
exports.register = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  // Nobody can register themselves as an Admin
  if (role === 'Admin') return fail(res, 400, 'Cannot register as an Admin user.');

  try {
    const user = await User.create({ name, username, email, password, role });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    fail(res, 400, errorMessage(err));
  }
};

/**
 * @route POST /api/v1/auth/login
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return fail(res, 400, 'Please provide an email and password');

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return fail(res, 401, 'Invalid email or password');
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    fail(res, 500, 'Internal server error during login.');
  }
};

/**
 * @route GET /api/v1/auth/me
 */
exports.getMe = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

/**
 * @route PUT /api/v1/auth/updatedetails
 */
exports.updateDetails = async (req, res) => {
  try {
    const fields = pick(req.body, ['name', 'username', 'bio', 'website', 'twitter', 'profilePic']);
    const user = await User.findByIdAndUpdate(req.user.id, fields, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    fail(res, 400, errorMessage(err));
  }
};

/**
 * @route PUT /api/v1/auth/updatepassword
 */
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return fail(res, 400, 'Please provide current and new password');
  }
  if (newPassword.length < 6) {
    return fail(res, 400, 'New password must be at least 6 characters');
  }

  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return fail(res, 401, 'Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    fail(res, 400, err.message);
  }
};

/**
 * @route PUT /api/v1/auth/updateavatar
 */
exports.updateAvatar = async (req, res) => {
  if (!req.file) return fail(res, 400, 'Please upload an image file');

  try {
    const result = await uploadToCloudinary(req.file.buffer, 'avatars');
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: result.secure_url },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user, profilePic: result.secure_url });
  } catch (err) {
    fail(res, 500, 'Could not upload image. Try again.');
  }
};

/**
 * @desc    Generate a 6 digit OTP and email it
 * @route   POST /api/v1/auth/forgotpassword
 */
exports.forgotPassword = async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) return fail(res, 404, 'There is no user with that email');

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpire = Date.now() + OTP_VALID_MINUTES * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: 'Password Reset OTP - The Blog Hub',
      message: `You requested a password reset.\n\nYour OTP is: ${otp}\n\nIt is valid for ${OTP_VALID_MINUTES} minutes.`,
      html: `<h2>Password Reset</h2><p>Your OTP will expire in ${OTP_VALID_MINUTES} minutes.</p><h1 style="background:#f4f4f4;padding:10px;text-align:center;letter-spacing:5px;">${otp}</h1>`,
    });

    res.status(200).json({ success: true, message: 'OTP sent to email. Please check your inbox.' });
  } catch (err) {
    console.error('Forgot password error:', err.message);

    if (user) {
      user.resetPasswordOtp = undefined;
      user.resetPasswordOtpExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }
    fail(res, 500, 'Failed to send the email. Please try again later.');
  }
};

/**
 * @route POST /api/v1/auth/verifyotp
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await findUserByValidOtp(email, otp);

    if (!user) return fail(res, 400, 'Invalid or Expired OTP');

    res.status(200).json({ success: true, message: 'OTP Verified successfully.' });
  } catch (err) {
    fail(res, 500, 'Failed to verify OTP');
  }
};

/**
 * @route PUT /api/v1/auth/resetpassword
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await findUserByValidOtp(email, otp);

    if (!user) return fail(res, 400, 'Invalid or Expired request. Start over.');

    // The pre-save hook hashes the password
    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. Please login with your new password.',
    });
  } catch (err) {
    fail(res, 400, err.message);
  }
};
