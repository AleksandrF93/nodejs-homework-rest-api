const { Nodejs26Error } = require('./errors');

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof Nodejs26Error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

const createError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};


const authError = {status: 401, message: 'Bad credentials'};

module.exports = {
  asyncWrapper,
  errorHandler,
  createError,
  authError
};