import joi from 'joi';
import { ValidationError } from '../utils/custom-error.js';
import { AppLogger } from '../utils/app-logger.js';

class MheController {
    constructor(mheService) {
        this.mheService = mheService;
        this.logger = new AppLogger();
    }

    createMhe = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                warehouseId: joi.number().required(),
                deviceId: joi.number().required(),
                isActive: joi.boolean().required()
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('MheController: Create MHE validation error', error);
                throw new ValidationError();
            }

            const { name, warehouseId, deviceId, isActive } = value;
            const mhe = await this.mheService.createMhe({ name, warehouseId, deviceId, isActive });

            res.status(201).json({ message: 'New MHE added successfully', mhe });

        } catch(err) {
            next(err);
        }
    }

    findAllMhe = async (req, res, next) => {
        try {
            const warehouseId = 1;
            const mhes = await this.mheService.findAllMhe(warehouseId);
            res.status(200).json(mhes);
        } catch(err) {
            next(err);
        }
    }

    findAllMhes = async (req, res, next) => {
        try {
            const results = await this.mheService.findAllMhes();
            res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    findMhe = async (req, res, next) => {
        try {
            const { id } = req.params;
            const results = await this.mheService.findMhe(id);
            res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    updateMhe = async (req, res, next) => {
        try {
            const { id } = req.params;
            
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                warehouseId: joi.number().required(),
                deviceId: joi.number().required(),
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('MheController: Update MHE validation error', error);
                throw new ValidationError();
            }

            const { name, deviceId, warehouseId } = value;

            await this.mheService.updateMhe({ id, deviceId, name, warehouseId });

            return res.status(200).json({
                message: 'MHE updated successfully'
            })
        } catch(err) {
            next(err);
        }
    }

    deleteMhe = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.mheService.deleteMhe(id);
            return res.status(200).json({ message: 'MHE deleted successfully'});
        } catch(err) {
            next(err);
        }
    }
}


export default MheController;