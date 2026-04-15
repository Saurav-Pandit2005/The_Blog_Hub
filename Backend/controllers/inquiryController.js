const Inquiry = require('../models/Inquiry');

/**
 * @desc    Submit an inquiry/contact form
 * @route   POST /api/v1/inquiries
 * @access  Public
 */
exports.submitInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || 'Server Error. Check your inquiry data.',
    });
  }
};

/**
 * @desc    Get all inquiries
 * @route   GET /api/v1/inquiries
 * @access  Private (Admin Only)
 */
exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching inquiries.',
    });
  }
};

/**
 * @desc    Delete an inquiry
 * @route   DELETE /api/v1/inquiries/:id
 * @access  Private (Admin Only)
 */
exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: `Inquiry not found with id: ${req.params.id}`,
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while deleting inquiry.',
    });
  }
};

/**
 * @desc    Reply to an inquiry
 * @route   PUT /api/v1/inquiries/:id/reply
 * @access  Private (Admin Only)
 */
exports.replyInquiry = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;
    let inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: `Inquiry not found with id: ${req.params.id}`,
      });
    }

    // Send Email
    const sendEmail = require('../utils/sendEmail');
    const message = `
      Hello ${inquiry.name},
      
      We have received your message regarding "${inquiry.subject}".
      
      Admin Response:
      "${replyMessage}"
      
      Best Regards,
      The Blog Hub Team
    `;

    try {
      await sendEmail({
        email: inquiry.email,
        subject: `Re: ${inquiry.subject} - The Blog Hub Support`,
        message,
      });

      inquiry.replyMessage = replyMessage;
      inquiry.status = 'Replied';
      inquiry.repliedAt = Date.now();
      await inquiry.save();

      res.status(200).json({
        success: true,
        data: inquiry,
        message: 'Reply sent and email delivered successfully.',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        error: 'Email could not be sent. Inquiry not updated.',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while replying to inquiry.',
    });
  }
};
