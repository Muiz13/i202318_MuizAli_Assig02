const User = require('../models/User');
const Post = require('../models/Post');
const Interaction = require('../models/Interaction');

class InteractionController {
  static async followUser(req, res) {
    try {
      const { userId } = req.params;
      const followerId = req.user.userId; // Extracted from the token in the authentication middleware

      // Check if the user is trying to follow themselves
      if (userId === followerId.toString()) {
        return res.status(400).json({ error: 'Cannot follow yourself' });
      }

      // Check if the user to follow exists
      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user is already following the target user
      const isFollowing = userToFollow.followers.includes(followerId);
      if (isFollowing) {
        return res.status(400).json({ error: 'Already following this user' });
      }

      // Follow the user
      await User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } });
      await User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } });

      res.json({ message: 'User followed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getFeed(req, res) {
    try {
      const userId = req.user.userId; // Extracted from the token in the authentication middleware

      // Get the user's following list
      const user = await User.findById(userId, 'following');
      const followingList = user.following;

      // Get posts from followed users
      const feedPosts = await Post.find({ author: { $in: followingList } }).populate('author', 'username');

      res.json(feedPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = InteractionController;
