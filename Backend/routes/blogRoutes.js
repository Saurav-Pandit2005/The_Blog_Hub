const express = require('express');
const {
  createBlog,
  getBlogs,
  getSingleBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  getCommentsByBlog,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Public
router.get('/', getBlogs);
router.get('/id/:id', getBlogById);
router.get('/:slug', getSingleBlog);
router.get('/:id/comments', getCommentsByBlog);

// Logged-in users
router.put('/:id/like', protect, likeBlog);
router.post('/:id/comment', protect, addComment);

// Author / Admin
router.post('/', protect, authorize('Author', 'Admin'), upload.single('coverImage'), createBlog);
router.put('/:id', protect, authorize('Author', 'Admin'), upload.single('coverImage'), updateBlog);
router.delete('/:id', protect, authorize('Author', 'Admin'), deleteBlog);

module.exports = router;
