const express = require('express');
const { 
  getDashboardStats, 
  getTopBlogs, 
  getAllBlogs, 
  getAllPodcasts, 
  getAllResources,
  getAllUsers,
  updateBlogStatus,
  updatePodcastStatus,
  updateResourceStatus,
  deleteUser,
  createUser,
  updateUser
} = require('../controllers/adminController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all routes and restrict to admin
router.use(protect);
router.use(authorize('Admin'));

router.get('/stats', getDashboardStats);
router.get('/top-blogs', getTopBlogs);
router.get('/blogs', getAllBlogs);
router.put('/blogs/:id/status', updateBlogStatus);
router.get('/podcasts', getAllPodcasts);
router.put('/podcasts/:id/status', updatePodcastStatus);
router.get('/resources', getAllResources);
router.put('/resources/:id/status', updateResourceStatus);
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
