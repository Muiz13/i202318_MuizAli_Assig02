const User = require('../models/User');
const Interaction = require('../models/Interaction');
const Post = require('../models/Post');

class UserService {
  static async followUser(userId, followerId) {
    try {
      // Check if the follower is already following the user
      const alreadyFollowing = await Interaction.findOne({ userId, followerId, type: 'follow' });
      if (alreadyFollowing) {
        throw new Error('User already followed');
      }

      // Create a new follow interaction
      const follow = new Interaction({ userId, followerId, type: 'follow' });
      await follow.save();

      // Add the follower to the user's followers list
      const user = await User.findById(userId);
      user.followers.push(followerId);
      await user.save();

      // Add notification for the user being followed
      await this.addNotification(userId, `${followerId} started following you`);

      return follow;
    } catch (error) {
      throw new Error('Error following user');
    }
  }

  static async getFeed(userId) {
    try {
      // Get the user's followers
      const user = await User.findById(userId);
      const followers = user.followers;

      // Get posts from the user's followers
      const feedPosts = await Post.find({ author: { $in: followers } }).populate('author', 'username');

      return feedPosts;
    } catch (error) {
      throw new Error('Error fetching user feed');
    }
  }

  static async getNotifications(userId) {
    try {
      // Find the user by ID and retrieve their notifications
      const user = await User.findById(userId).populate('notifications');
      return user.notifications;
    } catch (error) {
      throw new Error('Error fetching notifications');
    }
  }

  // Add more notification-related methods as needed

  static async addNotification(userId, message) {
    try {
      // Create a new notification
      const notification = { message, timestamp: Date.now() };

      // Add the notification to the user's notifications array
      const user = await User.findByIdAndUpdate(userId, { $push: { notifications: notification } }, { new: true });

      return user.notifications[user.notifications.length - 1]; // Return the added notification
    } catch (error) {
      throw new Error('Error adding notification');
    }
  }
}

module.exports = UserService;
