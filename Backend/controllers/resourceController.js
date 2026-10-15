const Resource = require('../models/Resource');
const { uploadField } = require('../middleware/upload');
const { fail, pick, isOwnerOrAdmin } = require('../utils/helpers');

const RESOURCE_FIELDS = ['title', 'type', 'category', 'desc', 'status', 'coverImage', 'fileUrl'];

// Build the document data from the request body and any uploaded files
const buildResourceData = async (req) => {
  const data = pick(req.body, RESOURCE_FIELDS);

  const coverImage = await uploadField(req.files, 'coverImage', 'resources/thumbnails');
  const fileUrl = await uploadField(req.files, 'resourceFile', 'resources/files');

  if (coverImage) data.coverImage = coverImage;
  if (fileUrl) data.fileUrl = fileUrl;

  return data;
};

/**
 * @route POST /api/v1/resources
 * @access Private (Author/Admin)
 */
exports.createResource = async (req, res) => {
  try {
    const data = await buildResourceData(req);
    const resource = await Resource.create({ ...data, author: req.user.id });

    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    fail(res, 400, err.message || 'Server Error. Check your resource data.');
  }
};

/**
 * @desc    Published resources
 * @route   GET /api/v1/resources
 * @access  Public
 */
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ status: 'Published' }).populate(
      'author',
      'name profilePic'
    );

    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching resources.');
  }
};

/**
 * @route GET /api/v1/resources/my-resources
 * @access Private (Author/Admin)
 */
exports.getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ author: req.user.id });

    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching your resources.');
  }
};

/**
 * @route GET /api/v1/resources/:id
 * @access Public
 */
exports.getSingleResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('author', 'name profilePic');

    if (!resource) return fail(res, 404, `Resource not found with id: ${req.params.id}`);

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching single resource.');
  }
};

/**
 * @route PUT /api/v1/resources/:id
 * @access Private (owner or Admin)
 */
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) return fail(res, 404, `Resource not found with id: ${req.params.id}`);
    if (!isOwnerOrAdmin(resource.author, req.user)) {
      return fail(res, 403, 'Not authorized to update this resource');
    }

    const data = await buildResourceData(req);
    const updated = await Resource.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    fail(res, 500, 'Server Error while updating resource.');
  }
};

/**
 * @route DELETE /api/v1/resources/:id
 * @access Private (owner or Admin)
 */
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) return fail(res, 404, `Resource not found with id: ${req.params.id}`);
    if (!isOwnerOrAdmin(resource.author, req.user)) {
      return fail(res, 403, 'Not authorized to delete this resource');
    }

    await resource.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    fail(res, 500, 'Server Error while deleting resource.');
  }
};

/**
 * @desc    Count a view: once per logged-in user (author excluded), always for guests
 * @route   PUT /api/v1/resources/:id/view
 * @access  Public
 */
exports.incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) return fail(res, 404, 'Resource not found');

    let updated = resource;

    if (!req.user) {
      updated = await Resource.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
    } else if (resource.author?.toString() !== req.user.id) {
      updated =
        (await Resource.findOneAndUpdate(
          { _id: id, viewedBy: { $ne: req.user.id } },
          { $inc: { views: 1 }, $push: { viewedBy: req.user.id } },
          { new: true }
        )) || resource;
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    fail(res, 500, 'Server Error updating views');
  }
};

/**
 * @desc    Count a download once per logged-in user (author excluded)
 * @route   PUT /api/v1/resources/:id/download
 * @access  Private
 */
exports.incrementDownloads = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) return fail(res, 404, 'Resource not found');

    if (resource.author?.toString() === req.user.id) {
      return res.status(200).json({ success: true, data: resource, alreadyDownloaded: true });
    }

    const updated = await Resource.findOneAndUpdate(
      { _id: id, downloadedBy: { $ne: req.user.id } },
      { $inc: { downloads: 1 }, $push: { downloadedBy: req.user.id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated || resource,
      alreadyDownloaded: !updated,
    });
  } catch (err) {
    fail(res, 500, 'Server Error updating downloads');
  }
};
