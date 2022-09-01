import express from 'express';

const router = express.Router();
const  avatarController = require('../controllers/avatarController');
const app = require('express')();

router.get('/:id', avatarController.getAvatar);

module.exports = router;