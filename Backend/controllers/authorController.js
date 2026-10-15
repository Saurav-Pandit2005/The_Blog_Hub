const Blog = require('../models/Blog');
const Podcast = require('../models/Podcast');
const Resource = require('../models/Resource');
const { fail } = require('../utils/helpers');

/**
 * @desc    Blogs written by the logged-in author
 * @route   GET /api/v1/author/blogs
 */
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching author blogs');
  }
};

/**
 * @desc    Dashboard numbers for the logged-in author
 * @route   GET /api/v1/author/stats
 */
exports.getAuthorStats = async (req, res) => {
  try {
    const [totalBlogs, totalPodcasts, totalResources, viewStats, recentBlogs] = await Promise.all([
      Blog.countDocuments({ author: req.user.id }),
      Podcast.countDocuments({ host: req.user.id }),
      Resource.countDocuments({ author: req.user.id }),
      Blog.aggregate([
        { $match: { author: req.user._id } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } },
      ]),
      Blog.find({ author: req.user.id })
        .sort('-createdAt')
        .limit(3)
        .select('title createdAt views status'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalBlogs,
        totalPodcasts,
        totalResources,
        totalViews: viewStats[0]?.totalViews || 0,
        recentBlogs,
      },
    });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching author stats');
  }
};
