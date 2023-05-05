const asyncHandler = require('express-async-handler');
const { userService } = require('../services');
const { getResponse } = require('../helpers/response');
require('dotenv').config();

// ===================================GET USER=================================
const getUser = asyncHandler(async (req, res) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const userData = await userService.getUserById(userId);
    if (userData) {
      return getResponse(res, 1, 'User fetched succesfully', 200, userData, {});
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

module.exports = {
  getUser,
};
