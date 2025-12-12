import { ForbiddenError, NotFoundError, UnauthorizedError } from '../utils/custom-error.js';
import { AppLogger } from '../utils/app-logger.js';
import bcrypt from 'bcryptjs';

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new AppLogger();
    }

    findAllRoles = async () => {
        try {
            const results = await this.userRepository.findAllRoles();
            return results;
        } catch(err) {
            throw(err);
        }
    }

    addUser = async ({ name, roleId, email, password, isActive }) => {
        try {
            const hash = bcrypt.hashSync(password, 10);

            let user = await this.userRepository.findUserByEmail(email);
            if (user) {
                this.logger.error('UserService: user already exists', user);
                throw new ForbiddenError('Email already exists');
            }
            
            user = await this.userRepository.addUser({name, email, roleId, password: hash, isActive});
            user.password = undefined;
            this.logger.info('UserService: user added', user);

            return user;
        } catch(err) {
            throw(err);
        }
    }

    findAllUsers = async () => {
        try {
            const results = await this.userRepository.findAllUsers();
            return results;
        } catch(err) {
            throw(err);
        }
    }

    findUserById = async (id) => {
        try {
            const user = await this.userRepository.findUserById(id);
            if (!user) {
                throw new UnauthorizedError();
            }
            user.password = undefined;
            return user;
        } catch(err) {
            throw err;
        }
    }

    deleteUser = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            const results = await this.userRepository.deleteUser(id);

            return results;
        } catch(err) {
            throw err;
        }
    }

    findUser = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            const user = await this.userRepository.findUserById(id);
            if (!user) {
                throw new NotFoundError('User not found.');
            }
            user.password = undefined;
            return user;
        } catch(err) {
            throw err;
        }
    }

    updateUser = async ({ id, name, email, roleId, isActive }) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }
            const user = await this.userRepository.findUserByEmail(email);
            if (user && user.id != id) {
                throw new ForbiddenError('Email already exists');
            }
            const results = await this.userRepository.updateUser({ id, name, email, roleId, isActive });
            return results;
        } catch(err) {
            throw err;
        }
    }
}

export default UserService;