import express from 'express';

const router = express.Router();
const  participateController = require('../controllers/participateController');

router.post('/:id', participateController.handleParticipate);
router.delete('/:id', participateController.removeMyParticipation);
module.exports = router;