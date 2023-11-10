const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getProfile(req, res) {
    try {
      const userId = req.user.userId; // Extracted from the token in the authentication middleware

      // Find the user by ID and send selected profile information
      const user = await User.findById(userId, 'username email role');

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.userId; // Extracted from the token in the authentication middleware
      const { username, email } = req.body;

      // Update the user's profile
      await User.findByIdAndUpdate(userId, { $set: { username, email } });

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AuthController;

