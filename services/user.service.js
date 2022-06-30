const jwt = require("jsonwebtoken");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { createError, authError } = require("../helpers/apiHelpers");
const {User} = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const FILE_DIR = path.resolve('./public');
const TEMP_DIR = path.resolve('./tmp');
require("dotenv").config();

const authenticateUser = async (token) => {
  try {
      const payload = jwt.verify(token, JWT_SECRET);
      const {id} = payload;
      const user = await User.findById(id);

      return user.token !== token ? null : user;
  } catch (e) {
      return null;
  }
}

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, {new: true});
}

const uploadImage = async (id, file) => {
  const avatarURL = path.join("avatar", `${id}${file.originalname}`)
  try {
      await sharp(file.path)
          .resize({width: 250})
          .toFile(path.join(FILE_DIR, avatarURL));
      return avatarURL;
  } catch (e) {
      console.log(e);
      throw e;
  } finally {
      await fs.unlink(file.path);
  }
}

const authMiddelwareAvatar =async (req, res, next) => {
  const {authorization = ""} = req.headers;
  const [bearer, token] = authorization.split(' ');

  if(bearer !== 'Bearer' || !token) {
      next(authError);
  }

  const user = await authenticateUser(token);
  if(!user) {
      next(authError);
  }
  req.user = user;
  next();
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
            cb(createError(400, 'Wrong format'))
        }
    },
    limits: {
        fieldNameSize: 100,
        fileSize: 5000000,
    }
})




module.exports = {
    authMiddelwareAvatar,
    updateUser,
    uploadImage,
    upload
  };