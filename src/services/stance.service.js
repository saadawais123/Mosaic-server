const { stances: StanceModel } = require('../sequelize/models');
const { Op } = require('sequelize');

const getAllStances = async () => {
  return await StanceModel.findAll({});
};

const getStanceById = async (stanceId) => {
  // Logic to update user profile (name, bio, profile picture)

  return await StanceModel.findOne({ where: { id: stanceId } });
};

const getUserStance = async (userId) => {
  // Logic to update user profile (name, bio, profile picture)

  return await StanceModel.findAll({ where: { userId } });
};

const updateStance = async (id, data) => {
  const stance = await StanceModel.findOne({ where: { id } });
  if (!stance) {
    throw new Error('Stance not found');
  }

  return stance.update(data);
};

const deleteStance = async (id) => {
  const stance = await StanceModel.findOne({ where: { id } });
  if (!stance) {
    throw new Error('Stance not found');
  }

  return stance.destroy();
};
const createStance = async (stanceBody) => {
  return await StanceModel.create(stanceBody);
};

module.exports = {
  getAllStances,
  getStanceById,
  getUserStance,
  createStance,
  updateStance,
  deleteStance,
};
