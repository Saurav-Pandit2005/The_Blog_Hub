const express = require('express');
const {
  createPodcast,
  getPodcasts,
  getSinglePodcast,
  updatePodcast,
  deletePodcast,
  getMyPodcasts,
} = require('../controllers/podcastController');

const router = express.Router();

const { protect, authorize, optionalProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/my-podcasts', protect, getMyPodcasts);

router
  .route('/')
  .get(getPodcasts)
  .post(protect, authorize('Author', 'Admin'), upload.fields([{ name: "audio", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), createPodcast);

router
  .route('/:id')
  .get(optionalProtect, getSinglePodcast)
  .put(protect, authorize('Author', 'Admin'), upload.fields([{ name: "audio", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), updatePodcast)
  .delete(protect, authorize('Author', 'Admin'), deletePodcast);

module.exports = router;
