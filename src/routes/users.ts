import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';

const verifyJWT = require('../middleware/verifyJWT');
const usersController = require('../controllers/usersController');
const app = require('express')();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'..','..','assets','img','avatar'));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage});


router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
app.use(verifyJWT);
router.put('/', upload.single('avatar') , usersController.changeUser);
module.exports = router;