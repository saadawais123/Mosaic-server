const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getResponse } = require('../helpers/response');

// Generate auth tokens
const generateAuthToken = async (user) => {
  try {
    let token;

    token = jwt.sign(
      {
        userId: user.id,
        userName: user.userName,
        email: user.email,
      },
      process.env.KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return {
      userId: user.id,
      email: user.email,
      token: token,
    };
  } catch (err) {
    return err;
  }
};
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return getResponse(res, 0, 'Token not found', 400, {}, {});
  }
  try {
    const decode = jwt.verify(token, process.env.KEY);
    if (!decode) {
      return getResponse(res, 0, 'Invalid Token', 400, {}, {});
    } else {
      req.user = decode;
      next();
    }
  } catch (error) {
    return getResponse(res, 0, error?.message, 400, {}, {});
  }

  // jwt.verify(token, process.env.KEY (err ,user) => {
  //   console.log(err)

  //   if (err) return res.sendStatus(403)

  //   req.user = user

  //   next()
  // })
};
module.exports = {
  generateAuthToken,
  verifyToken,
};
