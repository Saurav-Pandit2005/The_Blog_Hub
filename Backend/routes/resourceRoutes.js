const express = require('express');
const {
  createResource,
  getResources,
  getMyResources,
  getSingleResource,
  updateResource,
  deleteResource,
  incrementViews,
  incrementDownloads,
} = require('../controllers/resourceController');
const { protect, authorize, optionalProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

const resourceUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'resourceFile', maxCount: 1 },
]);

router.get('/my-resources', protect, getMyResources);

router
  .route('/')
  .get(getResources)
  .post(protect, authorize('Author', 'Admin'), resourceUpload, createResource);

router
  .route('/:id')
  .get(getSingleResource)
  .put(protect, authorize('Author', 'Admin'), resourceUpload, updateResource)
  .delete(protect, authorize('Author', 'Admin'), deleteResource);

router.put('/:id/view', optionalProtect, incrementViews); // unique per user, counted for guests
router.put('/:id/download', protect, incrementDownloads); // unique per logged-in user

module.exports = router;
