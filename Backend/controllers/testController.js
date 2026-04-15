const { uploadToCloudinary } = require('../middleware/upload');

/**
 * @desc    Check API Health
 * @route   GET /api/v1/health
 * @access  Public
 */
exports.getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      timestamp: new Date().toISOString(),
    },
  });
};

/**
 * @desc    Test Cloudinary Upload
 * @route   POST /api/v1/test/upload
 * @access  Public
 */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'testing');

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
