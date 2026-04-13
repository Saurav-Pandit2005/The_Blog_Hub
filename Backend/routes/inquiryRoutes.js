const express = require('express');
const {
  submitInquiry,
  getInquiries,
  deleteInquiry,
  replyInquiry,
} = require('../controllers/inquiryController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('Admin'), getInquiries)
  .post(submitInquiry);

router
  .route('/:id')
  .delete(protect, authorize('Admin'), deleteInquiry);

router
  .route('/:id/reply')
  .put(protect, authorize('Admin'), replyInquiry);

module.exports = router;
