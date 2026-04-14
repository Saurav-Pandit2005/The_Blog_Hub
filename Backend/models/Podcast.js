const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a podcast title'],
    trim: true,
  },
  host: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  type: {
    type: String,
    enum: ['Video', 'Audio'],
    default: 'Video',
  },
  desc: {
    type: String,
    required: [true, 'Please add a description'],
  },
  duration: {
    type: String,
    required: [true, 'Please add the duration'],
  },
  audioUrl: {
    type: String,
  },
  isExternal: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
    enum: ['Upload', 'YouTube', 'External'],
    default: 'Upload',
  },
  coverImage: {
    type: String,
    default: 'https://placehold.co/600x400/eff6ff/3b82f6?text=Podcast',
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Published'],
    default: 'Draft',
  },
  plays: {
    type: Number,
    default: 0,
  },
  viewers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Podcast', PodcastSchema);
