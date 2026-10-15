const Podcast = require('../models/Podcast');
const { uploadField } = require('../middleware/upload');
const { fail, pick, isOwnerOrAdmin } = require('../utils/helpers');

const PODCAST_FIELDS = [
  'title',
  'desc',
  'category',
  'duration',
  'type',
  'status',
  'isExternal',
  'source',
  'audioUrl',
  'coverImage',
];

// Build the document data from the request body and any uploaded files
const buildPodcastData = async (req) => {
  const data = pick(req.body, PODCAST_FIELDS);

  const audioUrl = await uploadField(req.files, 'audio', 'podcasts_audio');
  const coverImage = await uploadField(req.files, 'coverImage', 'podcasts_covers');

  if (audioUrl) data.audioUrl = audioUrl;
  if (coverImage) data.coverImage = coverImage;

  return data;
};

/**
 * @route POST /api/v1/podcasts
 * @access Private (Author/Admin)
 */
exports.createPodcast = async (req, res) => {
  try {
    const data = await buildPodcastData(req);
    const podcast = await Podcast.create({ ...data, host: req.user.id });

    res.status(201).json({ success: true, data: podcast });
  } catch (err) {
    fail(res, 400, err.message || 'Server Error. Check your podcast data.');
  }
};

/**
 * @desc    Published podcasts
 * @route   GET /api/v1/podcasts
 * @access  Public
 */
exports.getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ status: 'Published' }).populate('host', 'name profilePic');

    res.status(200).json({ success: true, count: podcasts.length, data: podcasts });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching podcasts.');
  }
};

/**
 * @route GET /api/v1/podcasts/my-podcasts
 * @access Private (Author/Admin)
 */
exports.getMyPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ host: req.user.id });

    res.status(200).json({ success: true, count: podcasts.length, data: podcasts });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching your podcasts.');
  }
};

/**
 * @desc    Get one podcast and count a play (once per logged-in user, always for guests)
 * @route   GET /api/v1/podcasts/:id
 * @access  Public
 */
exports.getSinglePodcast = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user) {
      await Podcast.updateOne(
        { _id: id, viewers: { $ne: req.user.id } },
        { $inc: { plays: 1 }, $push: { viewers: req.user.id } }
      );
    } else {
      await Podcast.updateOne({ _id: id }, { $inc: { plays: 1 } });
    }

    const podcast = await Podcast.findById(id).populate('host', 'name profilePic');

    if (!podcast) return fail(res, 404, `Podcast not found with id: ${id}`);

    res.status(200).json({ success: true, data: podcast });
  } catch (err) {
    fail(res, 500, 'Server Error while fetching single podcast.');
  }
};

/**
 * @route PUT /api/v1/podcasts/:id
 * @access Private (owner or Admin)
 */
exports.updatePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) return fail(res, 404, `Podcast not found with id: ${req.params.id}`);
    if (!isOwnerOrAdmin(podcast.host, req.user)) {
      return fail(res, 403, 'Not authorized to update this podcast');
    }

    const data = await buildPodcastData(req);
    const updated = await Podcast.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    fail(res, 500, err.message || 'Server Error while updating podcast.');
  }
};

/**
 * @route DELETE /api/v1/podcasts/:id
 * @access Private (owner or Admin)
 */
exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) return fail(res, 404, `Podcast not found with id: ${req.params.id}`);
    if (!isOwnerOrAdmin(podcast.host, req.user)) {
      return fail(res, 403, 'Not authorized to delete this podcast');
    }

    await podcast.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    fail(res, 500, 'Server Error while deleting podcast.');
  }
};
