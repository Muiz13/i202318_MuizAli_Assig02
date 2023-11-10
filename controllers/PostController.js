const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
  static async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const authorId = req.user.userId; // Extracted from the token in the authentication middleware

      // Check if the author exists
      const author = await User.findById(authorId);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      // Create a new post
      const newPost = new Post({ title, content, author: authorId });
      await newPost.save();

      res.json({ message: 'Post created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate('author', 'username');
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getPost(req, res) {
    try {
      const { postId } = req.params;

      // Find the post by ID and populate author details
      const post = await Post.findById(postId).populate('author', 'username');
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const newData = req.body;
      const authorId = req.user.userId; // Extracted from the token in the authentication middleware

      // Check if the post exists and the author matches
      const post = await Post.findOne({ _id: postId, author: authorId });
      if (!post) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }

      // Update the post
      await Post.findByIdAndUpdate(postId, { $set: newData });

      res.json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const authorId = req.user.userId; // Extracted from the token in the authentication middleware

      // Check if the post exists and the author matches
      const post = await Post.findOne({ _id: postId, author: authorId });
      if (!post) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }

      // Delete the post
      await Post.findByIdAndDelete(postId);

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
}

module.exports = PostController;

  