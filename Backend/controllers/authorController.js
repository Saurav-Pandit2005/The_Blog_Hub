const Blog = require('../models/Blog');
// @desc    Get all blogs for the logged-in author
// @route   GET /api/v1/author/blogs
// @access  Private/Author
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching author blogs'
    });
  }
};
const Podcast = require('../models/Podcast');
const Resource = require('../models/Resource');

// @desc    Get all resources for the logged-in author
// @route   GET /api/v1/author/resources
// @access  Private/Author
exports.getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ author: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching author resources'
    });
  }
};

// @desc    Get author specific dashboard statistics
// @route   GET /api/v1/author/stats
// @access  Private/Author
exports.getAuthorStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalBlogs = await Blog.countDocuments({ author: userId });
    const totalPodcasts = await Podcast.countDocuments({ host: userId });
    const totalResources = await Resource.countDocuments({ author: userId });

    const blogStats = await Blog.aggregate([
      { $match: { author: req.user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' }
        }
      }
    ]);

    const recentBlogs = await Blog.find({ author: userId })
      .sort('-createdAt')
      .limit(3)
      .select('title createdAt views status');

    res.status(200).json({
      success: true,
      data: {
        totalBlogs,
        totalPodcasts,
        totalResources,
        totalViews: blogStats[0]?.totalViews || 0,
        recentBlogs
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching author stats'
    });
  }
};
