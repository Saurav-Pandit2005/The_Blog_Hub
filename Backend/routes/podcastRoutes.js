const express = require('express');
const {
  createPodcast,
  getPodcasts,
  getMyPodcasts,
  getSinglePodcast,
  updatePodcast,
  deletePodcast,
} = require('../controllers/podcastController');
const { protect, authorize, optionalProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

const mediaUpload = upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

router.get('/my-podcasts', protect, getMyPodcasts);

router
  .route('/')
  .get(getPodcasts)
  .post(protect, authorize('Author', 'Admin'), mediaUpload, createPodcast);

router
  .route('/:id')
  .get(optionalProtect, getSinglePodcast)
  .put(protect, authorize('Author', 'Admin'), mediaUpload, updatePodcast)
  .delete(protect, authorize('Author', 'Admin'), deletePodcast);

module.exports = router;
