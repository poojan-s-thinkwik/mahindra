// BaseError.ts
export class BaseError extends Error {

  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name; // Sets the error name to the class name
    this.statusCode = statusCode; // Sets the status code
    Error.captureStackTrace(this, this.constructor); // Captures stack trace
  }
}

// NotFoundError.ts
export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// ValidationError.ts
export class ValidationError extends BaseError {
  constructor(message = 'Invalid input provided') {
    super(message, 400);
  }
}

// UnauthorizedError.ts
export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

// DatabaseError.ts
export class DatabaseError extends BaseError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
  }
}

export class ServerError extends BaseError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden access.') {
    super(message, 403);
  }
}
