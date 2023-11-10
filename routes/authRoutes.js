const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/AuthMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, AuthController.updateProfile);

module.exports = router;

