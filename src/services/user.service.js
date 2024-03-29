const httpStatus = require('http-status');
const createHttpError = require('http-errors');
const { users: User, company } = require('../sequelize/models');
const { NOT_EXTENDED } = require('http-status');
const md5 = require('md5');
const { Op } = require('sequelize');

const findUser = async (whereClause) => {
  return await User.findOne({ where: whereClause });
};

const finAllUser = async () => {
  return await User.findAll({  });
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};
const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
};
const createUser = async (userBody) => {
  if (
    await findUser({
      [Op.or]: [{ email: userBody.email }, { userName: userBody.userName }],
    })
  ) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    return false;
  }

  return User.create(userBody);
};

const updateUserProfile = async (userId, userBody) => {
  // Logic to update user profile (name, bio, profile picture)
  const user = await findUser({
    id: userId,
  })
  if (!user) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    return false;
  }

  const result= await User.update({ ...userBody }, {returning: true,  where: { id: userId } });
  return result
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserProfile,
  finAllUser
};
