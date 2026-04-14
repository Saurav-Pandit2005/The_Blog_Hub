const Resource = require('../models/Resource');
const { uploadToCloudinary } = require('../middleware/upload');

/**
 * @desc    Create a new resource
 * @route   POST /api/v1/resources
 * @access  Private (Author/Admin Only)
 */
exports.createResource = async (req, res, next) => {
  try {
    req.body.author = req.user.id; 

    if (req.files && req.files.coverImage) {
      const result = await uploadToCloudinary(req.files.coverImage[0].buffer, 'resources/thumbnails');
      req.body.coverImage = result.secure_url;
    }

    if (req.files && req.files.resourceFile) {
      const result = await uploadToCloudinary(req.files.resourceFile[0].buffer, 'resources/files');
      req.body.fileUrl = result.secure_url;
    }

    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || 'Server Error. Check your resource data.',
    });
  }
};

/**
 * @desc    Get all resources
 * @route   GET /api/v1/resources
 * @access  Public
 */
exports.getResources = async (req, res, next) => {
  try {
    let query = { status: 'Published' };

    const resources = await Resource.find(query).populate('author', 'name profilePic');

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching resources.',
    });
  }
};

/**
 * @desc    Get current user's resources
 * @route   GET /api/v1/resources/my-resources
 * @access  Private (Author/Admin)
 */
exports.getMyResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({ author: req.user.id });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching your resources.',
    });
  }
};


/**
 * @desc    Get single resource
 * @route   GET /api/v1/resources/:id
 * @access  Public
 */
exports.getSingleResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('author', 'name profilePic');

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: `Resource not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while fetching single resource.',
    });
  }
};

/**
 * @desc    Update resource
 * @route   PUT /api/v1/resources/:id
 * @access  Private (Author/Admin Only)
 */
exports.updateResource = async (req, res, next) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: `Resource not found with id: ${req.params.id}`,
      });
    }

    // Authorization check
    if (resource.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({
        success: false,
        error: `User ${req.user.id} is not authorized to update this resource`,
      });
    }

    if (req.files && req.files.coverImage) {
      const result = await uploadToCloudinary(req.files.coverImage[0].buffer, 'resources/thumbnails');
      req.body.coverImage = result.secure_url;
    }

    if (req.files && req.files.resourceFile) {
      const result = await uploadToCloudinary(req.files.resourceFile[0].buffer, 'resources/files');
      req.body.fileUrl = result.secure_url;
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while updating resource.',
    });
  }
};

/**
 * @desc    Delete resource
 * @route   DELETE /api/v1/resources/:id
 * @access  Private (Author/Admin Only)
 */
exports.deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: `Resource not found with id: ${req.params.id}`,
      });
    }

    // Authorization check
    if (resource.author && resource.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({
        success: false,
        error: `User ${req.user.id} is not authorized to delete this resource`,
      });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error while deleting resource.',
    });
  }
};

/**
 * @desc    Increment resource views
 * @route   PUT /api/v1/resources/:id/view
 * @access  Public
 */
exports.incrementViews = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    if (req.user?.id) {
      // Skip if the viewer is the resource author
      if (resource.author.toString() === req.user.id.toString()) {
        return res.status(200).json({ success: true, data: resource });
      }

      // Logged-in user: only count once
      const alreadyViewed = resource.viewedBy.some(id => id.toString() === req.user.id.toString());
      if (!alreadyViewed) {
        resource.views += 1;
        resource.viewedBy.push(req.user.id);
        await resource.save();
      }
    } else {
      // Guest: simple count (no tracking)
      resource.views += 1;
      await resource.save();
    }

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    console.error('View Error:', err);
    res.status(500).json({ success: false, error: 'Server Error updating views' });
  }
};

/**
 * @desc    Increment resource downloads (unique per user, excluding author)
 * @route   PUT /api/v1/resources/:id/download
 * @access  Private
 */
exports.incrementDownloads = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    if (!req.user?.id) {
      return res.status(401).json({ success: false, error: 'Please login to download' });
    }

    // Skip if the downloader is the resource author
    if (resource.author.toString() === req.user.id.toString()) {
      return res.status(200).json({ success: true, data: resource, alreadyDownloaded: true });
    }

    const alreadyDownloaded = resource.downloadedBy.some(id => id.toString() === req.user.id.toString());

    if (!alreadyDownloaded) {
      resource.downloads += 1;
      resource.downloadedBy.push(req.user.id);
      await resource.save();
    }

    res.status(200).json({ success: true, data: resource, alreadyDownloaded });
  } catch (err) {
    console.error('Download Error:', err);
    res.status(500).json({ success: false, error: 'Server Error updating downloads' });
  }
};


