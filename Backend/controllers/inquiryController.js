const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');
const { fail, pick } = require('../utils/helpers');

/**
 * @desc    Contact form submission
 * @route   POST /api/v1/inquiries
 * @access  Public
 */
exports.submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(pick(req.body, ['name', 'email', 'subject', 'message']));

    res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    fail(res, 400, err.message || 'Server Error. Check your inquiry data.');
  }
};

/**
 * @route GET /api/v1/inquiries
 * @access Private (Admin)
 */
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');

    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching inquiries.');
  }
};

/**
 * @route DELETE /api/v1/inquiries/:id
 * @access Private (Admin)
 */
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) return fail(res, 404, `Inquiry not found with id: ${req.params.id}`);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    fail(res, 500, 'Server Error while deleting inquiry.');
  }
};

/**
 * @desc    Email a reply to the sender and mark the inquiry as replied
 * @route   PUT /api/v1/inquiries/:id/reply
 * @access  Private (Admin)
 */
exports.replyInquiry = async (req, res) => {
  const { replyMessage } = req.body;

  if (!replyMessage || !replyMessage.trim()) return fail(res, 400, 'Please type a reply');

  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) return fail(res, 404, `Inquiry not found with id: ${req.params.id}`);

    try {
      await sendEmail({
        email: inquiry.email,
        subject: `Re: ${inquiry.subject} - The Blog Hub Support`,
        message: `Hello ${inquiry.name},\n\nWe have received your message regarding "${inquiry.subject}".\n\nAdmin Response:\n"${replyMessage}"\n\nBest Regards,\nThe Blog Hub Team`,
      });
    } catch (err) {
      console.error('Inquiry reply email failed:', err.message);
      return fail(res, 500, 'Email could not be sent. Inquiry not updated.');
    }

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
    fail(res, 500, 'Server Error while replying to inquiry.');
  }
};
