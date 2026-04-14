const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a resource title'],
    trim: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: [true, 'Please select a resource type'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  desc: {
    type: String,
    required: [true, 'Please add a description'],
  },
  coverImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Published'],
    default: 'Draft',
  },
  fileUrl: {
    type: String,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  downloadedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  viewedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resource', ResourceSchema);
