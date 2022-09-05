import express from 'express';
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');
const app = require('express')();
const thanksController = require('../controllers/thanksController');


router.get('/', thanksController.getThanks);
router.get('/:id', thanksController.getThank);
app.use(verifyJWT);
router.post('/', thanksController.createThanks);

module.exports = router;