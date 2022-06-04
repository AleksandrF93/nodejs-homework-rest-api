const { createError } = require("../helpers/errors");

const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(createError(400, error.message));
    }
    next();
  };
};

module.exports =  validation ;