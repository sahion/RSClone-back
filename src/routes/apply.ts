import express from 'express';
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');
const applyController = require('../controllers/applyController');

const app = require('express')();

router.get('/', applyController.getApplies);
app.use(verifyJWT);
router.post('/', applyController.createApply);

module.exports = router;