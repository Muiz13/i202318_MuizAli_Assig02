const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/users', AdminController.getAllUsers);
router.put('/users/:userId/block', AdminController.blockUser);
router.get('/posts', AdminController.getAllPosts);
router.put('/posts/:postId/disable', AdminController.disablePost);

module.exports = router;
