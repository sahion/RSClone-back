import express from 'express';
import multer from 'multer';
import path from 'path';
import { createBrotliCompress } from 'zlib';
const router = express.Router();

const registerController = require('../controllers/registerController');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'..','..','assets','img','avatar'));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage});

router.post('/', upload.single('avatar'),  registerController.handleNewUser);
module.exports = router;