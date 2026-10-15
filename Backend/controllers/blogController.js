const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { uploadToCloudinary } = require('../middleware/upload');
const { fail, pick, isOwnerOrAdmin } = require('../utils/helpers');

const BLOG_FIELDS = ['title', 'summary', 'content', 'category', 'status', 'coverImage'];

const withCommentsCount = async (blog) => ({
  ...blog.toObject(),
  commentsCount: await Comment.countDocuments({ blog: blog._id }),
});

/**
 * @route POST /api/v1/blogs
 * @access Private (Author/Admin)
 */
exports.createBlog = async (req, res) => {
  try {
    const data = { ...pick(req.body, BLOG_FIELDS), author: req.user.id };

    if (req.file) {
      data.coverImage = (await uploadToCloudinary(req.file.buffer, 'blogs')).secure_url;
    }

    const blog = await Blog.create(data);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    fail(res, 400, err.message || 'Server Error. Check your blog data.');
  }
};

/**
 * @desc    Published blogs with comment counts
 * @route   GET /api/v1/blogs
 * @access  Public
 */
exports.getBlogs = async (req, res) => {
  try {
    const sortBy =
      typeof req.query.sort === 'string' ? req.query.sort.split(',').join(' ') : '-createdAt';

    let query = Blog.find({ status: 'Published' })
      .populate('author', 'name profilePic')
      .sort(sortBy);

    const limit = parseInt(req.query.limit, 10);
    if (limit > 0) query = query.limit(limit);

    const blogs = await query;

    const commentCounts = await Comment.aggregate([
      { $match: { blog: { $in: blogs.map((b) => b._id) } } },
      { $group: { _id: '$blog', count: { $sum: 1 } } },
    ]);
    const countsMap = new Map(commentCounts.map((c) => [c._id.toString(), c.count]));

    const data = blogs.map((blog) => ({
      ...blog.toObject(),
      commentsCount: countsMap.get(blog._id.toString()) || 0,
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching blogs.');
  }
};

/**
 * @desc    Get a blog by slug and count a view
 * @route   GET /api/v1/blogs/:slug
 * @access  Public
 */
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name profilePic bio');

    if (!blog) return fail(res, 404, `Blog not found with slug: ${req.params.slug}`);

    res.status(200).json({ success: true, data: await withCommentsCount(blog) });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching single blog.');
  }
};

/**
 * @desc    Get a blog by id (used by the edit pages)
 * @route   GET /api/v1/blogs/id/:id
 * @access  Public
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name profilePic');

    if (!blog) return fail(res, 404, 'Blog not found');

    res.status(200).json({ success: true, data: await withCommentsCount(blog) });
  } catch (err) {
    fail(res, 500, 'Server Error fetching blog');
  }
};

/**
 * @route PUT /api/v1/blogs/:id
 * @access Private (owner or Admin)
 */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return fail(res, 404, 'Blog not found');
    if (!isOwnerOrAdmin(blog.author, req.user)) {
      return fail(res, 403, 'User not authorized to update this blog');
    }

    const data = pick(req.body, BLOG_FIELDS);
    if (req.file) {
      data.coverImage = (await uploadToCloudinary(req.file.buffer, 'blogs')).secure_url;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    fail(res, 400, err.message || 'Error updating blog');
  }
};

/**
 * @route DELETE /api/v1/blogs/:id
 * @access Private (owner or Admin)
 */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return fail(res, 404, `Blog not found with id: ${req.params.id}`);
    if (!isOwnerOrAdmin(blog.author, req.user)) {
      return fail(res, 403, 'Not authorized to delete this blog');
    }

    await Promise.all([blog.deleteOne(), Comment.deleteMany({ blog: blog._id })]);

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    fail(res, 500, 'Error deleting blog');
  }
};

/**
 * @desc    Like / unlike a blog
 * @route   PUT /api/v1/blogs/:id/like
 * @access  Private
 */
exports.likeBlog = async (req, res) => {
  try {
    const alreadyLiked = !!(await Blog.exists({ _id: req.params.id, likes: req.user.id }));

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      alreadyLiked ? { $pull: { likes: req.user.id } } : { $addToSet: { likes: req.user.id } },
      { new: true }
    );

    if (!blog) return fail(res, 404, 'Blog not found');

    res.status(200).json({ success: true, count: blog.likes.length, isLiked: !alreadyLiked });
  } catch (err) {
    fail(res, 500, 'Social Interaction Error. Try again.');
  }
};

/**
 * @route POST /api/v1/blogs/:id/comment
 * @access Private
 */
exports.addComment = async (req, res) => {
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';

  if (!content) return fail(res, 400, 'Comment content is required');

  try {
    if (!(await Blog.exists({ _id: req.params.id }))) return fail(res, 404, 'Blog not found');

    const comment = await Comment.create({
      content,
      blog: req.params.id,
      user: req.user.id,
    });
    await comment.populate('user', 'name profilePic');

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    fail(res, 500, 'Failed to add comment.');
  }
};

/**
 * @route GET /api/v1/blogs/:id/comments
 * @access Public
 */
exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.id })
      .populate('user', 'name profilePic')
      .sort('-createdAt');

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    fail(res, 500, 'Failed to fetch comments');
  }
};
