import { ValidationError } from "../utils/custom-error.js";
import joi from 'joi';
import { AppLogger } from "../utils/app-logger.js";

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new AppLogger();
    }

    findAllRoles = async (req, res, next) => {
        try {
            const results = await this.userService.findAllRoles();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    addUser = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().pattern(/^[A-Za-z\s]+$/).min(2).max(50).required(),
                roleId: joi.number().required(),
                email: joi.string().email().required(),
                password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
                isActive: joi.boolean().required()
            })

            const { value, error } = schema.validate(req.body);

            if (error) {
                this.logger.warn('UserService: Create user validation error', error);
                throw new ValidationError();
            }

            const { name, roleId, email, password, isActive } = value;

            const user = await this.userService.addUser({ 
                name: name.trim(), 
                roleId, 
                email: email.toLowerCase().trim(), 
                password: password.trim(), 
                isActive 
            });

            return res.status(201).json({
                message: 'User added successfully',
                user
            })
        } catch(err) {
            next(err);
        }
    }

    findAllUsers = async (req, res, next) => {
        try {
            const results = await this.userService.findAllUsers();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    findCurrentUser = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const user = await this.userService.findUserById(userId);
            return res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch(err) {
            next(err);
        }
    }

    findUser = async (req, res, next) => {
        try {
            let { id } = req.params;
            const user = await this.userService.findUser(id);
            return res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;

            const schema = joi.object({
                name: joi.string().trim().pattern(/^[A-Za-z\s]+$/).min(2).max(50).required(),
                roleId: joi.number().required(),
                email: joi.string().email().required(),
                isActive: joi.boolean().required()
            })

            const { value, error } = schema.validate(req.body);

            if (error) {
                this.logger.warn('UserService: Create user validation error', error);
                throw new ValidationError();
            }

            const { name, roleId, email, isActive } = value;

            await this.userService.updateUser({ id, name, roleId, email, isActive });

            return res.status(200).json({ message: 'User updated successfully' });
        } catch(err) {
            next(err);
        }
    }
}


export default UserController;