import express from 'express';

const router = express.Router();
const  avatarController = require('../controllers/avatarController');

router.get('/:id', avatarController.getAvatar);

module.exports = router;