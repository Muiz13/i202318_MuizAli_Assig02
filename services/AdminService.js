const User = require('../models/User');
const Post = require('../models/Post');

class AdminService {
  static async getAllUsers() {
    try {
      const users = await User.find({}, '-password'); // Exclude password field
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  static async blockUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.isBlocked = true;
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error blocking user');
    }
  }

  static async getAllPosts() {
    try {
      const posts = await Post.find().populate('author', 'username');
      return posts;
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  }

  static async disablePost(postId) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      post.isDisabled = true;
      await post.save();
      return post;
    } catch (error) {
      throw new Error('Error disabling post');
    }
  }
}

module.exports = AdminService;
