const multer = require('multer');
const { v2 } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('../config/config');

v2.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: v2,
});

const upLoad = multer({
    storage,
    limits: {
        fileSize: 5120 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!');
            err.name = 'ExtensionError';
            return cb(err);
        }
    },
});

module.exports = upLoad;
