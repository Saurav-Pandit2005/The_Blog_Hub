const Blog = require('../models/Blog');
const User = require('../models/User');
const Podcast = require('../models/Podcast');
const Resource = require('../models/Resource');

// @desc    Get all podcasts for moderation
// @route   GET /api/v1/admin/podcasts
// @access  Private/Admin
exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate('host', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching all podcasts'
    });
  }
};

// @desc    Get all resources for moderation
// @route   GET /api/v1/admin/resources
// @access  Private/Admin
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('author', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching all resources'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalPodcasts = await Podcast.countDocuments();
    const totalResources = await Resource.countDocuments();
    
    // Recent Users feed
    const recentUsers = await User.find()
      .select('name email role avatar createdAt')
      .sort('-createdAt')
      .limit(5);

    // Dynamic Activity Feed (Latest content)
    const blogs = await Blog.find().sort('-createdAt').limit(3).populate('author', 'name');
    const podcasts = await Podcast.find().sort('-createdAt').limit(3).populate('host', 'name role');
    const resources = await Resource.find().sort('-createdAt').limit(3).populate('author', 'name');
    
    const recentActivity = [
      ...blogs.map(b => ({ type: 'blog', title: b.title, user: b.author?.name, icon: '📝', time: b.createdAt })),
      ...podcasts.map(p => ({ type: 'podcast', title: p.title, user: p.host?.name, icon: '🎙️', time: p.createdAt })),
      ...resources.map(r => ({ type: 'resource', title: r.title, user: r.author?.name, icon: '📁', time: r.createdAt }))
    ].sort((a,b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

    res.status(200).json({
      success: true,
      data: {
        totalBlogs,
        totalUsers,
        totalPodcasts,
        totalResources,
        recentUsers,
        recentActivity
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get top performing blogs
// @route   GET /api/v1/admin/top-blogs
// @access  Private/Admin
exports.getTopBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views category coverImage');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
// @desc    Get all blogs for moderation
// @route   GET /api/v1/admin/blogs
// @access  Private/Admin
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name username email role')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching all blogs'
    });
  }
};

// @desc    Get all users for management
// @route   GET /api/v1/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching all users'
    });
  }
};

// @desc    Delete/Suspend user account
// @route   DELETE /api/v1/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Prevent deleting self
    if (user._id.toString() === req.user.id) {
       return res.status(400).json({ success: false, error: 'Cannot delete own admin account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// @desc    Update blog status (Approve/Reject/Archive)
// @route   PUT /api/v1/admin/blogs/:id/status
// @access  Private/Admin
exports.updateBlogStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Published', 'Draft', 'Archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status provided'
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
// @desc    Update podcast status (Approve/Reject/Archive)
// @route   PUT /api/v1/admin/podcasts/:id/status
// @access  Private/Admin
exports.updatePodcastStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Published', 'Draft', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const podcast = await Podcast.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!podcast) {
      return res.status(404).json({ success: false, error: 'Podcast not found' });
    }

    res.status(200).json({ success: true, data: podcast });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update resource status (Approve/Reject/Archive)
// @route   PUT /api/v1/admin/resources/:id/status
// @access  Private/Admin
exports.updateResourceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Published', 'Draft', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const resource = await Resource.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new user (from Admin Panel)
// @route   POST /api/v1/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (user) {
      return res.status(400).json({ 
        success: false, 
        error: 'User with this email or username already exists' 
      });
    }

    user = await User.create({
      name,
      username,
      email,
      password,
      role
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update user details
// @route   PUT /api/v1/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { name, username, email, role } = req.body;
    
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    // Save user (pre-save hook will handle password hashing if modified, but we are not sending password here)
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
