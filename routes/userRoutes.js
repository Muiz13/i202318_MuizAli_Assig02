const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/AuthMiddleware');

router.post('/follow/:userId', authenticateToken, UserController.followUser);
router.get('/feed', authenticateToken, UserController.getFeed);

// Notifications routes
router.get('/notifications', authenticateToken, UserController.getNotifications);

module.exports = router;

