const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

class AuthService {
  static async registerUser(username, email, password) {
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email is already registered');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Exclude password field from the response
      const userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password;

      return userWithoutPassword;
    } catch (error) {
      throw new Error('Error registering user');
    }
  }

  static async loginUser(email, password) {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      throw new Error('Error logging in');
    }
  }

  static generateToken(user) {
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = AuthService;
