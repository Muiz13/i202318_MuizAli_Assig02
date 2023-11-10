const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');

const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json(errorResponse('User not found.'));
    }

    // Check if the user is already following the target user
    const isAlreadyFollowing = req.user.following.includes(userId);
    if (isAlreadyFollowing) {
      return res.json(successResponse(`You are already following ${userToFollow.username}.`));
    }

    req.user.following.push(userId);
    await req.user.save();

    res.json(successResponse(`You are now following ${userToFollow.username}.`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Internal Server Error'));
  }
};

const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'following',
      select: 'posts',
      populate: { path: 'posts', select: 'title content createdAt' },
    });

    const feed = user.following.reduce((result, followedUser) => {
      result = result.concat(followedUser.posts);
      return result;
    }, []);

    res.json(successResponse('Feed retrieved successfully.', { feed }));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Internal Server Error'));
  }
};

module.exports = { followUser, getFeed };
