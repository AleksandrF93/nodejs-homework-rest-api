const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require('../helpers/errors');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    if (!authorization) {
      next(new NotAuthorizedError("Not authorized"));
    }
    if (!token) {
      next(new NotAuthorizedError("Please, provide a token"));
    }
    const user = jwt.decode(token, JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authMiddleware,
  ctrlWrapper
};