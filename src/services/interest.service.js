const {
  interest: Interest,
  userInterests: UserInterest,
} = require('../sequelize/models');
const { Op } = require('sequelize');

const getAllInterests = async (whereClause) => {
  return await Interest.findAll({});
};

const getUserInterests = async (userId) => {
  // Logic to update user profile (name, bio, profile picture)

  const UserInterests = await UserInterest.findAll({ where: { userId } });
  const UserInterestsIds = UserInterests?.map((item) => item.interestId);
  const interests = await Interest.findAll({
    where: {
      id: [...UserInterestsIds],
    },
  });
  return interests;
};
const addUserInterests = async (userId, interestIds) => {
  try {
    let interestsTobeAdded = [...interestIds];
    const userInterests = await UserInterest.findAll({
      where: { userId, interestId: [...interestIds] },
      attributes: ['interestId'],
    });
    const bulkCreateData = [];
    userInterests.map((item) => {
      const index = interestsTobeAdded.findIndex(
        (it) => it === item.interestId,
      );
      if (index > -1) {
        interestsTobeAdded.splice(index, 1);
      }
    });
    interestsTobeAdded.forEach((interestId) => {
      bulkCreateData.push({
        interestId,
        userId,
      });
    });
    await UserInterest.bulkCreate(bulkCreateData);
    return true;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getUserInterests,
  getAllInterests,
  addUserInterests,
};
