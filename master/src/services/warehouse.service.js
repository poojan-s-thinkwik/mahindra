import { generateRandomString } from "../utils/random-string.js";
import { AppLogger } from "../utils/app-logger.js";
import { convertToMinutes, convertToMinutesAlt } from "../utils/custom-date.js";
import { ForbiddenError, ValidationError } from "../utils/custom-error.js";

class WarehouseService {

    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
        this.logger = new AppLogger();
    }

    findAllStates = async () => {
        try {
            const results = await this.warehouseRepository.findAllStates();
            return results;
        } catch(err) {
            throw err;
        }
    }

    createWarehouse = async ({name, stateId, address, latitude, longitude}) => {
        try {
            const w = await this.warehouseRepository.findWarehouseByName(name);
            if (w) {
                throw new ForbiddenError('Warehouse name already exists');
            }
            const code = generateRandomString(6);
            const warehouse = await this.warehouseRepository.createWarehouse({name, code, stateId, address, latitude, longitude});
            this.logger.info('WarehouseService: New ware house created', warehouse);
            
            return warehouse;
        } catch(err) {
            throw err;
        }
    }

    findAllWarehouse = async () => {
        try {
            const results = await this.warehouseRepository.findAllWarehouse();
            return results;
        } catch(err) {
            throw err;
        }
    }

    createShift = async ({ name, warehouseId, startTime, endTime, teaBreakStartTime, teaBreakEndTime, lunchBreakStartTime, lunchBreakEndTime, setupStartTime, setupEndTime, bioBreakStartTime, bioBreakEndTime }) => {
        try {
            let warehouse = await this.warehouseRepository.findShiftByNameAndWarehouse({ name, warehouseId });
            if (warehouse) {
                this.logger.error('WarehouseService: Shift already exists for this warehouse', warehouse);
                throw new ForbiddenError('Shift already exists for this warehouse');
            }

            const startTimeInt = convertToMinutes(startTime);
            const endTimeInt = convertToMinutes(endTime);
            const teaBreakStartTimeInt = convertToMinutes(teaBreakStartTime);
            const teaBreakEndTimeInt = convertToMinutes(teaBreakEndTime);
            const lunchBreakStartTimeInt = convertToMinutes(lunchBreakStartTime);
            const lunchBreakEndTimeInt = convertToMinutes(lunchBreakEndTime);
            const setupStartTimeInt = convertToMinutes(setupStartTime);
            const setupEndTimeInt = convertToMinutes(setupEndTime);
            const bioBreakStartTimeInt = convertToMinutes(bioBreakStartTime);
            const bioBreakEndTimeInt = convertToMinutes(bioBreakEndTime);

            warehouse = await this.warehouseRepository.createShift({ 
                name, 
                warehouseId,
                startTime: startTimeInt, 
                endTime: endTimeInt, 
                teaBreakStartTime: teaBreakStartTimeInt, 
                teaBreakEndTime: teaBreakEndTimeInt, 
                lunchBreakStartTime: lunchBreakStartTimeInt, 
                lunchBreakEndTime: lunchBreakEndTimeInt, 
                setupStartTime: setupStartTimeInt, 
                setupEndTime: setupEndTimeInt, 
                bioBreakStartTime: bioBreakStartTimeInt, 
                bioBreakEndTime: bioBreakEndTimeInt 
            });

            return warehouse;
        } catch(err) {
            throw err;
        }
    }

    findAllShiftByWarehouse = async (warehouseId) => {
        try {
            const results = await this.warehouseRepository.findAllShiftByWarehouse(warehouseId);
            
            results.forEach(d => {
                d.startTime = convertToMinutesAlt(d.startTime);
                d.endTime = convertToMinutesAlt(d.endTime);
                d.teaBreakStartTime = convertToMinutesAlt(d.teaBreakStartTime);
                d.teaBreakEndTime = convertToMinutesAlt(d.teaBreakEndTime);
                d.lunchBreakStartTime = convertToMinutesAlt(d.lunchBreakStartTime);
                d.lunchBreakEndTime = convertToMinutesAlt(d.lunchBreakEndTime);
                d.setupStartTime = convertToMinutesAlt(d.setupStartTime);
                d.setupEndTime = convertToMinutesAlt(d.setupEndTime);
                d.bioBreakStartTime = convertToMinutesAlt(d.bioBreakStartTime);
                d.bioBreakEndTime = convertToMinutesAlt(d.bioBreakEndTime);
            })
            
            return results;
        } catch(err) {
            throw err;
        }
    }

    findShift = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            const results = await this.warehouseRepository.findShiftById(id);
            if (!results) {
                throw new NotFoundError('Shift not found.');
            }
            results.startTime = convertToMinutesAlt(results.startTime);
            results.endTime = convertToMinutesAlt(results.endTime);
            results.teaBreakStartTime = convertToMinutesAlt(results.teaBreakStartTime);
            results.teaBreakEndTime = convertToMinutesAlt(results.teaBreakEndTime);
            results.lunchBreakStartTime = convertToMinutesAlt(results.lunchBreakStartTime);
            results.lunchBreakEndTime = convertToMinutesAlt(results.lunchBreakEndTime);
            results.setupStartTime = convertToMinutesAlt(results.setupStartTime);
            results.setupEndTime = convertToMinutesAlt(results.setupEndTime);
            results.bioBreakStartTime = convertToMinutesAlt(results.bioBreakStartTime);
            results.bioBreakEndTime = convertToMinutesAlt(results.bioBreakEndTime);

            return results;
        } catch(err) {
            throw err;
        }
    }

    updateShift = async ({
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
    }) => {

        id = parseInt(id);
        if (isNaN(id)) {
            throw new ValidationError();
        }

        let shift = await this.warehouseRepository.findShiftByNameAndWarehouse({ name, warehouseId });
        if (shift && shift.id != id) {
            this.logger.error('WarehouseService: Shift already exists for this warehouse', warehouse);
            throw new ForbiddenError('Shift already exists for this warehouse');
        }
        await this.warehouseRepository.updateShift({
            id,
            name,
            warehouseId,
            startTime: convertToMinutes(startTime),
            endTime: convertToMinutes(endTime),
            teaBreakStartTime: convertToMinutes(teaBreakStartTime),
            teaBreakEndTime: convertToMinutes(teaBreakEndTime),
            lunchBreakStartTime: convertToMinutes(lunchBreakStartTime),
            lunchBreakEndTime: convertToMinutes(lunchBreakEndTime),
            setupStartTime: convertToMinutes(setupStartTime),
            setupEndTime: convertToMinutes(setupEndTime),
            bioBreakStartTime: convertToMinutes(bioBreakStartTime),
            bioBreakEndTime: convertToMinutes(bioBreakEndTime),
        })

        return;

    }

    deleteShift = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            await this.warehouseRepository.deleteShift(id);

            return;
        } catch(err) {
            throw err;
        }
    }

    findWarehouse = async  (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }
            const warehouse = await this.warehouseRepository.findWarehouseById(id);
            if (!warehouse) {
                throw new NotFoundError('Warehouse not found.');
            }
            return warehouse;
        } catch(err) {
            throw err;
        }
    }

    updateWarehouse = async ({ id, name, stateId, address, latitude, longitude }) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            const warehouse = await this.warehouseRepository.findWarehouseByName(name);
            if (warehouse && warehouse.id != id) {
                throw new ForbiddenError('Warehouse name already exists');
            }

            const results = await this.warehouseRepository.updateWarehouse({ id, name, stateId, address, latitude, longitude });

            return results;
        } catch(err) {
            throw(err);
        }
    }
}

export default WarehouseService;