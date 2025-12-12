import joi from 'joi';
import { ValidationError } from '../utils/custom-error.js';
import { AppLogger } from '../utils/app-logger.js';

class DeviceController {

    constructor(deviceService) {
        this.deviceService = deviceService;
        this.logger = new AppLogger();
    }

    createDeviceType = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(2).max(100).required(),
                ip: joi.string().trim().ip({ version: ['ipv4'], cidr: 'forbidden' }).required(),
                port: joi.number().integer().min(1).max(65535).required()
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('DeviceController: Create device type validation error', error);
                throw new ValidationError();
            }

            const { name, ip, port } = value;

            const deviceType = await this.deviceService.createDeviceType(name.trim(), ip.trim(), port);

            return res.status(201).json({
                message: 'Device type created successfully',
                deviceType
            })
        } catch(err) {
            next(err);
        }
    }

    findAllDeviceTypes = async (req, res, next) => {
        try {
            const results = await this.deviceService.findAllDeviceTypes();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    createDevice = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(2).max(50).required(),
                deviceTypeId: joi.number().required(),
                imei: joi.string().trim().length(15).pattern(/^\d{15}$/).required(),
                sim1: joi.string().trim().length(10).pattern(/^\d{10}$/).required(),
                sim2: joi.string().trim().length(10).pattern(/^\d{10}$/)
            })

            const { value, error } = schema.validate(req.body);
            if (error) {
                this.logger.warn('DeviceController: Create device validation error', error);
                throw new ValidationError();
            }

            const { name, deviceTypeId, imei, sim1, sim2 } = value;
            const device = await this.deviceService.createDevice({ 
                name: name.trim(), 
                deviceTypeId, 
                imei: imei.trim(), 
                sim1: sim1.trim(),
                sim2: sim2.trim()
             });
            return res.status(201).json({
                message: 'Device created successfully',
                device
            })
        } catch(err) {
            next(err);
        }
    }

    findAllDevices = async (req, res, next) => {
        try {
            const results = await this.deviceService.findAllDevices();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }
}



export default DeviceController;