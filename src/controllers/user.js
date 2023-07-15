const asyncHandler = require("express-async-handler");
const { userService, userFollower } = require("../services");
const { getResponse } = require("../helpers/response");
require("dotenv").config();

// ===================================GET USER=================================
const getUser = asyncHandler(async (req, res) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const userData = await userService.getUserById(userId);
    if (userData) {
      return getResponse(res, 1, "User fetched succesfully", 200, userData, {});
    }
    return getResponse(res, 0, "User not Found", 404, userData, {});
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const {
    } = req;
    const userData = await userService.finAllUser();
    if (userData) {
      return getResponse(res, 1, "User fetched succesfully", 200, userData, {});
    }
    return getResponse(res, 0, "User not Found", 404, userData, {});
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
      body,
    } = req;
    const userData = await userService.updateUserProfile(userId, body);
    if (userData) {
      return getResponse(res, 1, "User updated succesfully", 200, userData, {});
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const followUser = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
      body: { followingId },
    } = req;
    const userData = await userFollower.addUserFollowing(userId, followingId);
    if (userData) {
      return getResponse(
        res,
        1,
        "User Followed succesfully",
        200,
        userData,
        {}
      );
    }
    return getResponse(res, 1, "User already following", 200, userData, {});
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getUserFollowing = asyncHandler(async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const userData = await userFollower.getUserFollowings(userId);
    if (userData) {
      return getResponse(
        res,
        1,
        "User Followings fetched Successfully",
        200,
        userData,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getUserFollowers = asyncHandler(async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const userData = await userFollower.getUserFollowers(userId);
    if (userData) {
      return getResponse(
        res,
        1,
        "User Followers fetched succesfully",
        200,
        userData,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});
module.exports = {
  getUser,
  updateProfile,
  followUser,
  getUserFollowers,
  getUserFollowing,
  getAllUsers
};
