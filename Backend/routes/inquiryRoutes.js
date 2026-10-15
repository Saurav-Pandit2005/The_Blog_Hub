const express = require('express');
const {
  submitInquiry,
  getInquiries,
  deleteInquiry,
  replyInquiry,
} = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, authorize('Admin'), getInquiries).post(submitInquiry);
router.delete('/:id', protect, authorize('Admin'), deleteInquiry);
router.put('/:id/reply', protect, authorize('Admin'), replyInquiry);

module.exports = router;
