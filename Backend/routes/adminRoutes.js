const express = require('express');
const {
  getDashboardStats,
  getAllBlogs,
  getAllPodcasts,
  getAllResources,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('Admin'));

router.get('/stats', getDashboardStats);
router.get('/blogs', getAllBlogs);
router.get('/podcasts', getAllPodcasts);
router.get('/resources', getAllResources);

router.route('/users').get(getAllUsers).post(createUser);
router.route('/users/:id').put(updateUser).delete(deleteUser);

module.exports = router;
