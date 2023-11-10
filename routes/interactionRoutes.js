const express = require('express');
const router = express.Router();
const InteractionController = require('../controllers/InteractionController');
const { authenticateToken } = require('../middleware/AuthMiddleware');

router.post('/follow/:userId', authenticateToken, InteractionController.followUser);
router.get('/feed', authenticateToken, InteractionController.getFeed);


module.exports = router;
