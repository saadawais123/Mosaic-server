const asyncHandler = require('express-async-handler');
const { interestService } = require('../services');
const { getResponse } = require('../helpers/response');
require('dotenv').config();

const getAll = asyncHandler(async (req, res) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const interests = await interestService.getAllInterests();
    if (interests) {
      return getResponse(
        res,
        1,
        'interests fetched succesfully',
        200,
        interests,
        {},
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const getInterestByUser = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
    } = req;
    const interests = await interestService.getUserInterests(userId);
    if (interests) {
      return getResponse(
        res,
        1,
        'interests fetched succesfully',
        200,
        interests,
        {},
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

const addUserInterest = asyncHandler(async (req, res) => {
  try {
    const {
      user: { userId },
      body: { interestIds },
    } = req;
    const interests = await interestService.addUserInterests(
      userId,
      interestIds,
    );
    if (interests) {
      return getResponse(
        res,
        1,
        'interests added succesfully',
        200,
        interests,
        {},
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

module.exports = {
  getAll,
  getInterestByUser,
  addUserInterest,
};
