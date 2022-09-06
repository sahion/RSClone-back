import express from 'express';
const router = express.Router();

const applyController = require('../controllers/allDataController');

router.get('/', applyController.getAllData);

module.exports = router;