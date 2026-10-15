const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const ALLOWED_TYPES = ['image', 'video', 'audio'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  fileFilter: (req, file, cb) => {
    const isAllowed =
      ALLOWED_TYPES.some((type) => file.mimetype.startsWith(type)) ||
      file.mimetype === 'application/pdf';

    if (isAllowed) return cb(null, true);

    const error = new Error('Only images, videos, audio, and PDF files are allowed!');
    error.status = 400;
    cb(error, false);
  },
});

// Upload a buffer to Cloudinary and return the upload result
const uploadToCloudinary = (fileBuffer, folder = 'blog_hub') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(fileBuffer);
  });

// Upload one named file from multer's req.files and return its URL (or undefined)
const uploadField = async (files, field, folder) => {
  const file = files && files[field] && files[field][0];
  if (!file) return undefined;
  const result = await uploadToCloudinary(file.buffer, folder);
  return result.secure_url;
};

module.exports = { upload, uploadToCloudinary, uploadField };
