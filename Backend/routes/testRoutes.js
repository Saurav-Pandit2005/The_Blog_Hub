const express = require('express');
const router = express.Router();
const { getHealth, uploadImage } = require('../controllers/testController');
const { upload } = require('../middleware/upload');

router.get('/health', getHealth);
router.post('/upload', upload.single('file'), uploadImage);

module.exports = router;
