const asyncHandler = require("express-async-handler");
const { topicService } = require("../services");
const { getResponse } = require("../helpers/response");

require("dotenv").config();

const getAll = asyncHandler(async (req, res) => {
  try {
    const topics = await topicService.findAllTopics();
    if (topics) {
      return getResponse(res, 1, "topics fetched succesfully", 200, topics, {});
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

module.exports = {
  getAll,
};
