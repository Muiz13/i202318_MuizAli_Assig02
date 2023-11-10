const Post = require('../models/Post');

class SearchService {
  static async searchPosts(keyword) {
    try {
      const regex = new RegExp(keyword, 'i');
      const posts = await Post.find({
        $or: [{ title: regex }, { content: regex }],
      }).populate('author', 'username');

      return posts;
    } catch (error) {
      throw new Error('Error searching posts');
    }
  }

  static async sortPostsByDate(posts) {
    try {
      // Sort posts by creation date in descending order
      posts.sort((a, b) => b.createdAt - a.createdAt);
      return posts;
    } catch (error) {
      throw new Error('Error sorting posts by date');
    }
  }

  static async filterPostsByCategory(posts, category) {
    try {
      // Filter posts by category
      const filteredPosts = posts.filter((post) => post.category === category);
      return filteredPosts;
    } catch (error) {
      throw new Error('Error filtering posts by category');
    }
  }

  static async sortPostsByRating(posts) {
    try {
      // Sort posts by average rating in descending order
      posts.sort((a, b) => b.averageRating - a.averageRating);
      return posts;
    } catch (error) {
      throw new Error('Error sorting posts by rating');
    }
  }

  static async filterPostsByAuthor(posts, authorId) {
    try {
      // Filter posts by author
      const filteredPosts = posts.filter((post) => post.author._id.toString() === authorId);
      return filteredPosts;
    } catch (error) {
      throw new Error('Error filtering posts by author');
    }
  }

  // Add more sorting and filtering methods as needed
}

module.exports = SearchService;
