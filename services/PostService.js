const Post = require('../models/Post');

class PostService {
  static async createPost(title, content, authorId) {
    try {
      const newPost = new Post({ title, content, author: authorId });
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new Error('Error creating post');
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

  static async getPostById(postId) {
    try {
      const post = await Post.findById(postId).populate('author', 'username');
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Error fetching post');
    }
  }

  static async updatePost(postId, newData) {
    try {
      const post = await Post.findByIdAndUpdate(postId, newData, { new: true });
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Error updating post');
    }
  }

  static async deletePost(postId) {
    try {
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Error deleting post');
    }
  }

}

module.exports = PostService;

