const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Multer memory storage (doesn't save files to disk)
const storage = multer.memoryStorage();

// File filter (Optional - only allow images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video') || file.mimetype.startsWith('audio') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images, videos, audio, and PDF files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

/**
 * Helper to upload a buffer to Cloudinary and get the URL
 * @param {Buffer} fileBuffer
 * @param {String} folder - Optional Cloudinary folder name
 */
const uploadToCloudinary = (fileBuffer, folder = 'blog_hub') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = { upload, uploadToCloudinary };
