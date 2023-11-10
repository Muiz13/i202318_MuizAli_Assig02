const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');

router.get('/posts', SearchController.searchPosts);

// Sorting routes
router.get('/posts/sort/date', SearchController.sortPostsByDate);
router.get('/posts/sort/rating', SearchController.sortPostsByRating);

// Filtering routes
router.get('/posts/filter/category/:category', SearchController.filterPostsByCategory);
router.get('/posts/filter/author/:authorId', SearchController.filterPostsByAuthor);

module.exports = router;
