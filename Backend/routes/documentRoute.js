// documentRoute.js
const express = require('express');
const multer = require('multer');
const DocumentController = require('../controllers/DocumentController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('document'), DocumentController.uploadDocument);

module.exports = router;

