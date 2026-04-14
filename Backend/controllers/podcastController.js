const Podcast = require('../models/Podcast');
const { uploadToCloudinary } = require('../middleware/upload');

/**
 * @desc    Create a new podcast
 * @route   POST /api/v1/podcasts
 * @access  Private (Author/Admin Only)
 */
exports.createPodcast = async (req, res, next) => {
  try {
    req.body.host = req.user.id;

    // Handle File Uploads
    if (req.files) {
      if (req.files.audio) {
        const audioResult = await uploadToCloudinary(req.files.audio[0].buffer, 'podcasts_audio');
        req.body.audioUrl = audioResult.secure_url;
      }
      if (req.files.coverImage) {
        const coverResult = await uploadToCloudinary(req.files.coverImage[0].buffer, 'podcasts_covers');
        req.body.coverImage = coverResult.secure_url;
      }
    }

    const podcast = await Podcast.create(req.body);

    res.status(201).json({
      success: true,
      data: podcast,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || 'Server Error. Check your podcast data.',
    });
  }
};

/**
 * @desc    Get all podcasts
 * @route   GET /api/v1/podcasts
 * @access  Public
 */
exports.getPodcasts = async (req, res, next) => {
  try {
    let query = { status: 'Published' };

    // Admin/Author might see all, logic can be added later
    
    const podcasts = await Podcast.find(query).populate('host', 'name profilePic');

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching podcasts.',
    });
  }
};

/**
 * @desc    Get current user's podcasts
 * @route   GET /api/v1/podcasts/my-podcasts
 * @access  Private (Author/Admin)
 */
exports.getMyPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find({ host: req.user.id });

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching your podcasts.',
    });
  }
};


/**
 * @desc    Get single podcast
 * @route   GET /api/v1/podcasts/:id
 * @access  Public
 */
exports.getSinglePodcast = async (req, res, next) => {
  try {
    if (req.user) {
      // Logged in user: Increment ONLY if not in viewers array
      await Podcast.updateOne(
        { _id: req.params.id, viewers: { $ne: req.user.id } },
        { $inc: { plays: 1 }, $push: { viewers: req.user.id } }
      );
    } else {
      // Anonymous visitor (Optional: you can skip if you only want registered user views)
      // For now, let's keep it count for all but without tracking
      await Podcast.updateOne(
        { _id: req.params.id },
        { $inc: { plays: 1 } }
      );
    }

    const podcast = await Podcast.findById(req.params.id).populate('host', 'name profilePic');

    if (!podcast) {
      return res.status(404).json({
        success: false,
        error: `Podcast not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: podcast,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching single podcast.',
    });
  }
};

/**
 * @desc    Update podcast
 * @route   PUT /api/v1/podcasts/:id
 * @access  Private (Author/Admin Only)
 */
exports.updatePodcast = async (req, res, next) => {
  try {
    let podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        error: `Podcast not found with id: ${req.params.id}`,
      });
    }

    // Make sure user is podcast owner or admin
    if (podcast.host.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({
        success: false,
        error: `User ${req.user.id} is not authorized to update this podcast`,
      });
    }

    // Handle File Uploads
    if (req.files) {
      if (req.files.audio) {
        const audioResult = await uploadToCloudinary(req.files.audio[0].buffer, 'podcasts_audio');
        req.body.audioUrl = audioResult.secure_url;
      }
      if (req.files.coverImage) {
        const coverResult = await uploadToCloudinary(req.files.coverImage[0].buffer, 'podcasts_covers');
        req.body.coverImage = coverResult.secure_url;
      }
    }

    podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: podcast,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error while updating podcast.',
    });
  }
};

/**
 * @desc    Delete podcast
 * @route   DELETE /api/v1/podcasts/:id
 * @access  Private (Author/Admin Only)
 */
exports.deletePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        error: `Podcast not found with id: ${req.params.id}`,
      });
    }

    // Make sure user is podcast owner or admin
    if (podcast.host.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({
        success: false,
        error: `User ${req.user.id} is not authorized to delete this podcast`,
      });
    }

    await podcast.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while deleting podcast.',
    });
  }
};
