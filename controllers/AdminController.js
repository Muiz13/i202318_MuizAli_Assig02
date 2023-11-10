const User = require('../models/User');
const Post = require('../models/Post');

class AdminController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async blockUser(req, res) {
    try {
      const { userId } = req.params;

      // Block the user (disable login)
      await User.findByIdAndUpdate(userId, { $set: { blocked: true } });

      res.json({ message: 'User blocked successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await Post.find({}, 'title author createdAt averageRating');
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async disablePost(req, res) {
    try {
      const { postId } = req.params;

      // Disable the post (hide from users)
      await Post.findByIdAndUpdate(postId, { $set: { disabled: true } });

      res.json({ message: 'Post disabled successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AdminController;

  