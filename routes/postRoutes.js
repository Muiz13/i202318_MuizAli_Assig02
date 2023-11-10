const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authenticateToken } = require('../middleware/AuthMiddleware');

router.post('/', authenticateToken, PostController.createPost);
router.get('/', PostController.getAllPosts);
router.get('/:postId', PostController.getPost);
router.put('/:postId', authenticateToken, PostController.updatePost);
router.delete('/:postId', authenticateToken, PostController.deletePost);

// Rating routes
router.post('/:postId/rate', authenticateToken, PostController.ratePost);

// Commenting routes
router.post('/:postId/comment', authenticateToken, PostController.commentOnPost);

// Sorting routes
router.get('/sort/date', PostController.sortPostsByDate);
router.get('/sort/rating', PostController.sortPostsByRating);

// Filtering routes
router.get('/filter/category/:category', PostController.filterPostsByCategory);
router.get('/filter/author/:authorId', PostController.filterPostsByAuthor);

module.exports = router;
