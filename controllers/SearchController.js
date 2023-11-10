const Post = require('../models/Post');
const SearchService = require('../services/SearchService');

class SearchController {
  static async searchPosts(req, res) {
    try {
      const { keyword } = req.query;

      // Search for posts based on the keyword
      const searchResults = await SearchService.searchPosts(keyword);

      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
}

module.exports = SearchController;
