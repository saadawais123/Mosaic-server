const httpStatus = require('http-status');
const md5 = require('md5');
const asyncHandler = require('express-async-handler');
const { userService, tokenService, authService } = require('../services');
const { getResponse } = require('../helpers/response');

// ===================================CREATING USER(SIGN UP)=================================
const register = asyncHandler(async (req, res) => {
  try {
    const user = await userService.createUser({
      ...req.body,
      password: md5(req.body?.password),
    });
    if (!user) {
      return getResponse(res, 0, 'Email/User Name already taken', 400, {}, {});
    }
    const token = await tokenService.generateAuthToken(user);
    return getResponse(res, 1, 'User Created Successfully', 200, user, token);
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

// ===================================SIGN IN=================================
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      return getResponse(
        res,
        0,
        'Incorrect Email or Password',
        httpStatus.UNAUTHORIZED,
        {},
        {},
      );
    } else {
      const token = await tokenService.generateAuthToken(user);
      return getResponse(
        res,
        1,
        'User Logged In Successfully',
        200,
        user,
        token,
      );
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }
});

module.exports = {
  register,
  logIn,
};
