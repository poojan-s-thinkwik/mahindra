import joi from 'joi';
import { ValidationError } from '../utils/custom-error.js';
import { AppLogger } from '../utils/app-logger.js';

class WarehouseController {

    constructor(warehouseService) {
        this.warehouseService = warehouseService;
        this.logger = new AppLogger();
    }

    findAllStates = async (req, res, next) => {
        try {
            const results = await this.warehouseService.findAllStates();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    createWarehouse = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                stateId: joi.number().required(),
                address: joi.string(),
                latitude: joi.number().min(-90).max(90).precision(6),
                longitude: joi.number().min(-180).max(180).precision(6)
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('WarehouseController: Create warehouse validation error', error);
                throw new ValidationError();
            }

            const { name, stateId, address, latitude, longitude } = value;

            const warehouse = await this.warehouseService.createWarehouse({
                name: name.trim(), 
                stateId, 
                address: address.trim(), 
                latitude, 
                longitude
            });
            
            return res.status(201).json({
                message: 'Warehouse created successfully',
                warehouse
            });
        } catch(err) {
            next(err);
        }
    }

    findAllWarehouse = async (req, res, next) => {
        try {
            const results = await this.warehouseService.findAllWarehouse();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    createShift = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                warehouseId: joi.number().required(),
                startTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                endTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                teaBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                teaBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                lunchBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                lunchBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                setupStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                setupEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                bioBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                bioBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('WarehouseController: Create shift validation error', error);
                throw new ValidationError();
            }

            const { name, warehouseId, startTime, endTime, teaBreakStartTime, teaBreakEndTime, lunchBreakStartTime, lunchBreakEndTime, setupStartTime, setupEndTime, bioBreakStartTime, bioBreakEndTime } = value;
            const shift = await this.warehouseService.createShift({
                name: name.trim(), 
                warehouseId,
                startTime, 
                endTime, 
                teaBreakStartTime, 
                teaBreakEndTime, 
                lunchBreakStartTime, 
                lunchBreakEndTime, 
                setupStartTime, 
                setupEndTime, 
                bioBreakStartTime, 
                bioBreakEndTime
            });

            return res.status(200).json({ message: 'Shift created successfully', shift });
        } catch(err) {
            next(err);
        }
    }

    findAllShift = async (req, res, next) => {
        try {
            const warehouseId = 1;
            const results = await this.warehouseService.findAllShiftByWarehouse(warehouseId);
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    findShift = async (req, res, next) => {
        try {
            const { id } = req.params;
            const results = await this.warehouseService.findShift(id);
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    updateShift = async (req, res, next) => {
        try {
            const { id } = req.params;
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                warehouseId: joi.number().required(),
                startTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                endTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                teaBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                teaBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                lunchBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                lunchBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                setupStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                setupEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                bioBreakStartTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
                bioBreakEndTime: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('WarehouseController: Create shift validation error', error);
                throw new ValidationError();
            }

            const { name, warehouseId, startTime, endTime, teaBreakStartTime, teaBreakEndTime, lunchBreakStartTime, lunchBreakEndTime, setupStartTime, setupEndTime, bioBreakStartTime, bioBreakEndTime } = value;
            
            await this.warehouseService.updateShift({
                id,
                name,
                warehouseId,
                startTime, 
                endTime, 
                teaBreakStartTime, 
                teaBreakEndTime,
                lunchBreakStartTime, 
                lunchBreakEndTime, 
                setupStartTime, 
                setupEndTime, 
                bioBreakStartTime,
                bioBreakEndTime
            });

            return res.status(200).json({
                message: 'Shift updated successfully'
            })
        } catch(err) {
            next(err);
        }
    }

    deleteShift = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.warehouseService.deleteShift(id);
            return res.status(200).json({
                message: 'Shift deleted successfully'
            })
        } catch(err) {
            next(err);
        }
    }

    findWarehouse = async (req, res, next) => {
        try {
            const { id } = req.params;
            const results = await this.warehouseService.findWarehouse(id);
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    updateWarehouse = async (req, res, next) => {
        try {
            const { id } = req.params;
            
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                stateId: joi.number().required(),
                address: joi.string(),
                latitude: joi.number().min(-90).max(90).precision(6),
                longitude: joi.number().min(-180).max(180).precision(6)
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('WarehouseController: Create warehouse validation error', error);
                throw new ValidationError();
            }

            const { name, stateId, address, latitude, longitude } = value;

            await this.warehouseService.updateWarehouse({
                id, name, stateId, address, latitude, longitude
            });

            return res.status(200).json({
                message: 'Warehouse updated successfully'
            });
        } catch(err) {
            next(err);
        }
    }
}

export default WarehouseController;