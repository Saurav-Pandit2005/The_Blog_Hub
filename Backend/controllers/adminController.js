const Blog = require('../models/Blog');
const User = require('../models/User');
const Podcast = require('../models/Podcast');
const Resource = require('../models/Resource');
const { fail, errorMessage, withoutPassword } = require('../utils/helpers');

/**
 * @route GET /api/v1/admin/stats
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      totalUsers,
      totalPodcasts,
      totalResources,
      recentUsers,
      blogs,
      podcasts,
      resources,
    ] = await Promise.all([
      Blog.countDocuments(),
      User.countDocuments(),
      Podcast.countDocuments(),
      Resource.countDocuments(),
      User.find().select('name email role profilePic createdAt').sort('-createdAt').limit(5),
      Blog.find().sort('-createdAt').limit(3).populate('author', 'name'),
      Podcast.find().sort('-createdAt').limit(3).populate('host', 'name role'),
      Resource.find().sort('-createdAt').limit(3).populate('author', 'name'),
    ]);

    const recentActivity = [
      ...blogs.map((b) => ({ type: 'blog', title: b.title, user: b.author?.name, icon: '📝', time: b.createdAt })),
      ...podcasts.map((p) => ({ type: 'podcast', title: p.title, user: p.host?.name, icon: '🎙️', time: p.createdAt })),
      ...resources.map((r) => ({ type: 'resource', title: r.title, user: r.author?.name, icon: '📁', time: r.createdAt })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);

    res.status(200).json({
      success: true,
      data: { totalBlogs, totalUsers, totalPodcasts, totalResources, recentUsers, recentActivity },
    });
  } catch (err) {
    fail(res, 500, err.message);
  }
};

/**
 * @desc    All blogs, any status
 * @route   GET /api/v1/admin/blogs
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching all blogs');
  }
};

/**
 * @desc    All podcasts, any status
 * @route   GET /api/v1/admin/podcasts
 */
exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate('host', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: podcasts.length, data: podcasts });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching all podcasts');
  }
};

/**
 * @desc    All resources, any status
 * @route   GET /api/v1/admin/resources
 */
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('author', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching all resources');
  }
};

/**
 * @route GET /api/v1/admin/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt');

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching all users');
  }
};

/**
 * @route POST /api/v1/admin/users
 */
exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const user = await User.create({ name, username, email, password, role });

    res.status(201).json({ success: true, data: withoutPassword(user) });
  } catch (err) {
    fail(res, 400, errorMessage(err));
  }
};

/**
 * @route PUT /api/v1/admin/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return fail(res, 404, 'User not found');

    ['name', 'username', 'email', 'role'].forEach((field) => {
      if (req.body[field]) user[field] = req.body[field];
    });
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    fail(res, 400, errorMessage(err));
  }
};

/**
 * @route DELETE /api/v1/admin/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return fail(res, 400, 'Cannot delete own admin account');
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return fail(res, 404, 'User not found');

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    fail(res, 500, 'Server Error');
  }
};
