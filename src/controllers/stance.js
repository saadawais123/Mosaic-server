const asyncHandler = require('express-async-handler');
const { stanceService } = require('../services');
const { getResponse } = require('../helpers/response');
require('dotenv').config();

const getAll = asyncHandler(async (req, res) => {
  try {
    const stances = await stanceService.getAllStances();
    if (stances) {
      return getResponse(
        res,
        1,
        'stances fetched succesfully',
        200,
        stances,
        {},
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
        'stances fetched succesfully',
        200,
        stances,
        {},
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
    const stances = await stanceService.getUserStance(userId);
    if (stances) {
      return getResponse(
        res,
        1,
        'stances fetched succesfully',
        200,
        stances,
        {},
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
        'Stance updated succesfully',
        200,
        updatedStance,
        {},
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
    } = req;
    const addedStance = await stanceService.createStance({ userId, ...body });
    if (addedStance) {
      return getResponse(
        res,
        1,
        'stances added succesfully',
        200,
        addedStance,
        {},
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
        'Stance Deleted succesfully',
        200,
        deletedStance,
        {},
      );
    }
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
};
