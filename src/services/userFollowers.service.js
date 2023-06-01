const {
  interest: Interest,
  userInterests: UserInterest,
  userFollowers: UserFollower,
  users: User,
} = require('../sequelize/models');
const { Op } = require('sequelize');

const getUserFollowers = async (userId) => {
  const Userfollowers = await UserFollower.findAll({
    where: {
      followingId: userId,
    },
  });
  const followingids = Userfollowers?.map((item) => item?.followerId);
  const users = await User.findAll({
    where: {
      id: [...followingids],
    },
    attributes: ['id', 'userName', 'profile_picture'],
  });
  return users;
};

const getUserFollowings = async (userId) => {
  const UserFollowings = await UserFollower.findAll({
    where: {
      followerId: userId,
    },
  });
  const followingids = UserFollowings?.map((item) => item?.followingId);
  const users = await User.findAll({
    where: {
      id: [...followingids],
    },
    attributes: ['id', 'userName', 'profile_picture'],
  });
  return users;
};

const addUserFollowing = async (userId, followingId) => {
  try {
    console.log('userId, followingId', userId, followingId);
    const alreadyFollowing = await UserFollower.findOne({
      where: {
        followingId,
        followerId: userId,
      },
    });
    if (!alreadyFollowing) {
      const follower = await UserFollower.create({
        followerId: userId,
        followingId,
      });
      return follower;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUserFollowing,
  getUserFollowers,
  getUserFollowings,
};
