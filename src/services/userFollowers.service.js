const {
  interests: Interest,
  userInterests: UserInterest,
  userFollowers: UserFollower,
} = require('../sequelize/models');
const { Op } = require('sequelize');

const getUserFollowers = async (userId) => {
  const followerIds = await UserFollower.findAll({
    where: {
      followingId: userId,
    },
  });
  return followerIds;
};

const getUserFollowings = async (userId) => {
  const followingIds = await UserFollower.findAll({
    where: {
      followerId: userId,
    },
  });
  return followingIds;
};

const addUserFollowing = async (userId, followingId) => {
  const follower = await UserFollower.create({
    where: {
      followerId: userId,
      followingId,
    },
  });
  return follower;
};

module.exports = {
  addUserFollowing,
  getUserFollowers,
  getUserFollowings,
};
