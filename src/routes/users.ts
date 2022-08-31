import express from 'express';
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
module.exports = router;