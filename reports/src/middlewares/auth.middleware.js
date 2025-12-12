import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/custom-error.js';
import config from '../config.js';

class AuthMiddleware {
  static verifyToken(req, res, next) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        next(new UnauthorizedError());
      }

      const { userId, roleId } = jwt.verify(token, config.authKey);

      req.user = { userId, roleId };
      next();
    } catch (error) {
      next(error);
    }
  }

  static verifyApiKey(req, res, next) {
    try {
      const apiKey = req.header("x-api-key");
      if (!apiKey || apiKey != config.systemApiKey) {
        throw new Error("Invalid API key");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthMiddleware;
