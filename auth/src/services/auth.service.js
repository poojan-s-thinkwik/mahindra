import { ForbiddenError } from "../utils/custom-error.js";
import bcrypt from 'bcryptjs';
import config from '../config.js';
import jwt from 'jsonwebtoken';

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    login = async (email, password) => {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new ForbiddenError('Invalid email or password');
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            if (!user.isActive) {
                throw new ForbiddenError('Account is not active');
            }

            const token = jwt.sign({ userId: user.id, roleId: user.roleId }, config.authKey, { expiresIn: '12h' })

            return token;
        } catch(err) {
            throw err;
        }
    }
}

export default AuthService;