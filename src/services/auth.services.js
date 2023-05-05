const httpStatus = require('http-status');
const md5 = require('md5');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (user?.password !== md5(password)) {
    return false;
  }
  return user;
};
module.exports = {
  loginUserWithEmailAndPassword,
};
