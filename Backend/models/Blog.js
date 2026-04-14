const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a blog title'],
  },
  slug: String,
  content: {
    type: String, // Or JSON if using a specific editor like Editor.js
    required: [true, 'Please add the blog content'],
  },
  coverImage: {
    type: String,
    default: 'https://placehold.co/800x450/eff6ff/3b82f6?text=Blog+Cover',
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Published'],
    default: 'Draft',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [
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

// Create blog slug from title
BlogSchema.pre('save', async function () {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[^\w-]+/g, '');
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
