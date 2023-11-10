const Interaction = require('../models/Interaction');
const User = require('../models/User');
const Post = require('../models/Post');

class InteractionService {
  static async likePost(userId, postId) {
    try {
      const existingLike = await Interaction.findOne({ userId, postId, type: 'like' });
      if (existingLike) {
        throw new Error('User already liked this post');
      }

      const like = new Interaction({ userId, postId, type: 'like' });
      await like.save();

      return like;
    } catch (error) {
      throw new Error('Error liking post');
    }
  }

  static async commentOnPost(userId, postId, comment) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      const newComment = new Interaction({ userId, postId, type: 'comment', comment });
      await newComment.save();

      // Add the comment to the post
      post.comments.push(newComment._id);
      await post.save();

      return newComment;
    } catch (error) {
      throw new Error('Error commenting on post');
    }
  }

  static async followUser(followerId, userId) {
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

      return follow;
    } catch (error) {
      throw new Error('Error following user');
    }
  }
}

module.exports = InteractionService;
