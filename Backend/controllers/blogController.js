const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { uploadToCloudinary } = require('../middleware/upload');

/**
 * @desc    Create a new blog
 * @route   POST /api/v1/blogs
 * @access  Private (Author/Admin Only)
 */
exports.createBlog = async (req, res, next) => {
  try {
    // Add author ID from the authenticated user
    req.body.author = req.user.id;

    // Handle image upload if file exists
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blogs');
      req.body.coverImage = result.secure_url;
    }

    // Create the blog
    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error('❌ Blog Creation Error:', err);
    res.status(400).json({
      success: false,
      error: err.message || 'Server Error. Check your blog data.',
    });
  }
};

/**
 * @desc    Get all blogs (Published only for public, all for Admin)
 * @route   GET /api/v1/blogs
 * @access  Public (Published Only)
 */
exports.getBlogs = async (req, res, next) => {
  try {
    let queryObj = { status: 'Published' };
    
    // Create query
    let query = Blog.find(queryObj).populate('author', 'name profilePic');

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default to newest
    }

    // Limit
    if (req.query.limit) {
      const limit = parseInt(req.query.limit, 10);
      query = query.limit(limit);
    }

    const blogs = await query;

    // Fetch comment counts for these blogs efficiently
    const blogIds = blogs.map(b => b._id);
    const commentCounts = await Comment.aggregate([
      { $match: { blog: { $in: blogIds } } },
      { $group: { _id: "$blog", count: { $sum: 1 } } }
    ]);

    // Create a map for quick lookups
    const countsMap = {};
    commentCounts.forEach(item => {
      countsMap[item._id.toString()] = item.count;
    });

    // Attach count to each blog
    const blogsWithCounts = blogs.map(blog => {
      const bObj = blog.toObject();
      bObj.commentsCount = countsMap[blog._id.toString()] || 0;
      return bObj;
    });

    res.status(200).json({
      success: true,
      count: blogsWithCounts.length,
      data: blogsWithCounts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching blogs.',
    });
  }
};

/**
 * @desc    Get a single blog by slug
 * @route   GET /api/v1/blogs/:slug
 * @access  Public
 */
exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate(
      'author',
      'name profilePic bio'
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: `Blog not found with slug: ${req.params.slug}`,
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    // Get comment count
    const commentCount = await Comment.countDocuments({ blog: blog._id });
    
    const blogData = blog.toObject();
    blogData.commentsCount = commentCount;

    res.status(200).json({
      success: true,
      data: blogData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching single blog.',
    });
  }
};
/**
 * @desc    Get a single blog by ID
 * @route   GET /api/v1/blogs/id/:id
 * @access  Public (for detail) / Private (for editing)
 */
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name profilePic');

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    const commentCount = await Comment.countDocuments({ blog: blog._id });
    const blogData = blog.toObject();
    blogData.commentsCount = commentCount;

    res.status(200).json({ success: true, data: blogData });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error fetching blog' });
  }
};

/**
 * @desc    Update a blog
 * @route   PUT /api/v1/blogs/:id
 * @access  Private (Author/Admin)
 */
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    // Make sure user is owner or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'User not authorized to update this blog' });
    }

    // Handle Image Upload if file provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blogs');
      req.body.coverImage = result.secure_url;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Error updating blog' });
  }
};

/**
 * @desc    Delete a blog
 * @route   DELETE /api/v1/blogs/:id
 * @access  Private (Author/Admin)
 */
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: `Blog not found with id: ${req.params.id}` });
    }

    // Make sure user is owner or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error deleting blog' });
  }
};

/**
 * @desc    Like/Unlike a blog
 * @route   PUT /api/v1/blogs/:id/like
 * @access  Private (Logged-in Readers/Authors/Admins)
 */
exports.likeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    const userId = req.user._id.toString();

    // Check if user has already liked the blog (Robust way)
    const alreadyLiked = blog.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      // Unlike (remove user id)
      blog.likes = blog.likes.filter((uid) => uid.toString() !== userId);
    } else {
      // Like (add user id)
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      success: true,
      count: blog.likes.length,
      isLiked: !alreadyLiked
    });
  } catch (err) {
    console.error('❌ Like Blog Error:', err);
    res.status(500).json({ success: false, error: 'Social Interaction Error. Try again.' });
  }
};

/**
 * @desc    Add a comment to a blog
 * @route   POST /api/v1/blogs/:id/comment
 * @access  Private (Logged in users)
 */
exports.addComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { content } = req.body;
    
    if (!content) {
       return res.status(400).json({ success: false, error: 'Comment content is required' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    // Get user identity from request (handling both .id and ._id)
    const userId = req.user._id || req.user.id;

    const comment = await Comment.create({
      content,
      blog: blogId,
      user: userId
    });

    const populatedComment = await Comment.findById(comment._id).populate('user', 'name profilePic');
    res.status(201).json({ success: true, data: populatedComment });
  } catch (err) {
    console.error('❌ Add Comment Error:', err);
    res.status(500).json({ success: false, error: 'Failed to add comment. Check server logs.' });
  }
};

/**
 * @desc    Get comments for a blog
 * @route   GET /api/v1/blogs/:id/comments
 * @access  Public
 */
exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.id }).populate('user', 'name profilePic').sort('-createdAt');
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch comments' });
  }
};
