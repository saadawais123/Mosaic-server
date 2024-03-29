const asyncHandler = require("express-async-handler");
const { stanceService, topicService } = require("../services");
const { getResponse } = require("../helpers/response");
const { getUserFollowings } = require("../services/userFollowers.service");
const { getStances, getTopicForVideo } = require("../services/stance.service");
const { Op } = require("sequelize");
require("dotenv").config();

const getAll = asyncHandler(async (req, res) => {
  try {
    const stances = await stanceService.getAllStances();
    if (stances) {
      return getResponse(
        res,
        1,
        "stances fetched succesfully",
        200,
        stances,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getById = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
    } = req;
    const stances = await stanceService.getStanceById(stanceId);
    if (stances) {
      return getResponse(
        res,
        1,
        "stance fetched succesfully",
        200,
        stances,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getStancesByUser = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
    } = req;
    console.log("userID:::::::::::::::::::", userId);
    const stances = await stanceService.getUserStance(userId);
    if (stances) {
      return getResponse(
        res,
        1,
        "stances fetched succesfully",
        200,
        stances,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const updateStance = asyncHandler(async (req, res) => {
  try {
    const { body } = req;
    const updatedStance = await stanceService.updateStance(body.id, body);
    if (updatedStance) {
      return getResponse(
        res,
        1,
        "Stance updated succesfully",
        200,
        updatedStance,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const createnewStance = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
      body,
      file,
    } = req;
    const videoPath = file.path;
    const topic = await getTopicForVideo(videoPath);
    const savedTopic = await topicService.findOrCreate(topic);
    const addedStance = await stanceService.createStance({
      userId,
      ...body,
      topicId: savedTopic.id,
    });
    if (addedStance) {
      return getResponse(
        res,
        1,
        "stances added succesfully",
        200,
        addedStance,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const deleteStance = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
    } = req;
    const deletedStance = await stanceService.deleteStance(stanceId);
    if (deletedStance) {
      return getResponse(
        res,
        1,
        "Stance Deleted succesfully",
        200,
        deletedStance,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getUserHomeScreenStance = asyncHandler(async (req, res) => {
  try {
    const {
      params: { topicId, userId },
    } = req;
    // const userFollowing = await getUserFollowings(userId);
    // const userFollowingIds = userFollowing?.map((item) => item?.dataValues?.id);
    const stances = await getStances({
      userId: {
        [Op.ne]: userId,
      },
      topicId,
    });
    if (stances) {
      return getResponse(
        res,
        1,
        "Stance Fetched succesfully",
        200,
        stances,
        {}
      );
    }
    return getResponse(res, 1, "Stance Fetched succesfully", 200, stances, {});
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const addLikeToStance = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
      user: { userId },
    } = req;

    const updatedStance = await stanceService.addLikeToStance(stanceId, userId);
    if (updatedStance) {
      return getResponse(
        res,
        1,
        "Stance updated succesfully",
        200,
        updatedStance,
        {}
      );
    }
    return getResponse(res, 1, "Stance already liked", 400, updatedStance, {});
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const addShareToPost = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
    } = req;
    const updatedStance = await stanceService.addShareToPost(stanceId);
    if (updatedStance) {
      return getResponse(
        res,
        1,
        "Stance updated succesfully",
        200,
        updatedStance,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const repostStance = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
    } = req;
    const updatedStance = await stanceService.addRepostToPost(stanceId);
    if (updatedStance) {
      return getResponse(
        res,
        1,
        "Stance updated succesfully",
        200,
        updatedStance,
        {}
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const dislikeStance = asyncHandler(async (req, res) => {
  try {
    const {
      params: { stanceId },
      user: { userId },
    } = req;
    const updatedStance = await stanceService.addDislikeToPost(
      stanceId,
      userId
    );
    if (updatedStance) {
      return getResponse(
        res,
        1,
        "Stance updated succesfully",
        200,
        updatedStance,
        {}
      );
    }
    return getResponse(
      res,
      1,
      "Stance already disliked",
      400,
      updatedStance,
      {}
    );
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});
module.exports = {
  getAll,
  getById,
  getStancesByUser,
  createnewStance,
  updateStance,
  deleteStance,
  getUserHomeScreenStance,
  addLikeToStance,
  addShareToPost,
  repostStance,
  dislikeStance,
};
