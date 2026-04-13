const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog, getBlogById, likeBlog, addComment, getCommentsByBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Publicly fetch blogs
router.get('/', getBlogs);
router.get('/:slug', getSingleBlog);
router.get('/id/:id', getBlogById); 

// Social Actions
router.put('/:id/like', protect, likeBlog);
router.post('/:id/comment', protect, addComment);
router.get('/:id/comments', getCommentsByBlog);

// Role-protected Content Management
router.post('/', protect, authorize('Author', 'Admin'), upload.single('coverImage'), createBlog);
router.put('/:id', protect, authorize('Author', 'Admin'), upload.single('coverImage'), updateBlog);
router.delete('/:id', protect, authorize('Author', 'Admin'), deleteBlog);

module.exports = router;
