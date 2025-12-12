import { PrismaClient } from '@prisma/client';

import  UserRepository  from '../repositories/user.repository.js';
import  UserService  from '../services/user.service.js';
import  UserController  from './user.controller.js';

import AuthController from './auth.controller.js';
import AuthService from '../services/auth.service.js';


const prisma = new PrismaClient();


const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);