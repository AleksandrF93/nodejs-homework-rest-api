class Nodejs26Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class UpdateParametersError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  Nodejs26Error,
  ValidationError,
  WrongParametersError,
  UpdateParametersError,
  NotAuthorizedError,
};
