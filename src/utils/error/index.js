class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}
  
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class DBError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const createCustomError = (msg, statusCode) => new CustomAPIError(msg, statusCode);

  
export { createCustomError, CustomAPIError, BadRequestError, UnauthenticatedError, NotFoundError, ForbiddenError, DBError };