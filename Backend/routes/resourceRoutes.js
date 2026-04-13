const express = require('express');
const {
  createResource,
  getResources,
  getSingleResource,
  updateResource,
  deleteResource,
  incrementViews,
  incrementDownloads,
  getMyResources,
} = require('../controllers/resourceController');

const router = express.Router();

const { protect, authorize, optionalProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/my-resources', protect, getMyResources);

const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'resourceFile', maxCount: 1 }
]);

router
  .route('/')
  .get(getResources)
  .post(protect, authorize('Author', 'Admin'), uploadFields, createResource);

router
  .route('/:id')
  .get(getSingleResource)
  .put(protect, authorize('Author', 'Admin'), uploadFields, updateResource)
  .delete(protect, authorize('Author', 'Admin'), deleteResource);

router.put('/:id/view', optionalProtect, incrementViews);        // Unique per user / counts for guest
router.put('/:id/download', protect, incrementDownloads);        // Unique per logged-in user only


module.exports = router;
