const httpStatus = require('http-status');
const createHttpError = require('http-errors');
const { users: User, company } = require('../sequelize/models');
const { NOT_EXTENDED } = require('http-status');
const md5 = require('md5');
const { Op } = require('sequelize');

const findUser = async (whereClause) => {
  return await User.findOne({ where: whereClause });
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};
const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id: id },
    include: [
      {
        model: company,
        as: 'company',
        required: false,
      },
    ],
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

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};