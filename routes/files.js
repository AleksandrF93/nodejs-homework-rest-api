const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE_DIR = path.resolve('./tmp');

const router = new express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [, extension] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${extension}`)
    }
});
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
    uploadController
} = require('../controllers/files');
const uploadMiddleware = multer({ storage });

router.patch('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
router.use('/download', express.static(FILE_DIR));

module.exports = router;