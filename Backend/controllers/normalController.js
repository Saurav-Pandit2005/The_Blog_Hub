const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

/**
 * @desc    Get Normal User Stats (Liked and Commented Blogs)
 * @route   GET /api/v1/normal/stats
 * @access  Private (Visitor)
 */
exports.getStats = async (req, res, next) => {
  try {
    // Blogs the user has liked
    const likedBlogs = await Blog.find({ likes: req.user.id }).select('title slug coverImage createdAt likes');

    // Comments the user has made
    const userComments = await Comment.find({ user: req.user.id }).populate('blog', 'title slug coverImage').sort('-createdAt');

    // Extract unique commented blogs
    // Or just pass comments directly
    const commentedBlogsRaw = userComments.map(c => c.blog).filter(b => b != null);
    
    // Deduplicate commented blogs
    const commentedBlogsMap = new Map();
    commentedBlogsRaw.forEach(b => commentedBlogsMap.set(b._id.toString(), b));
    const commentedBlogs = Array.from(commentedBlogsMap.values());

    res.status(200).json({
      success: true,
      data: {
        totalLikes: likedBlogs.length,
        totalCommented: commentedBlogs.length,
        totalComments: userComments.length,
        likedBlogs,
        userComments
      }
    });
  } catch (err) {
    console.error('Error fetching normal stats:', err);
    res.status(500).json({ success: false, error: 'Server Error fetching normal stats' });
  }
};
