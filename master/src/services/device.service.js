import { AppLogger } from "../utils/app-logger.js";
import { ForbiddenError } from "../utils/custom-error.js";

class DeviceService {

    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
        this.logger = new AppLogger();
    }

    createDeviceType = async (name, ip, port) => {
        try {
            let deviceType = await this.deviceRepository.findDeviceTypeByName(name);
            if (deviceType) {
                this.logger.error('DeviceService: Devicetype already exists', deviceType);
                throw new ForbiddenError('Device type already exists');
            }

            deviceType = await this.deviceRepository.createDeviceType(name, ip, port);

            return deviceType;
        } catch(err) {
            throw err;
        }
    }

    findAllDeviceTypes = async () => {
        try {
            const results = await this.deviceRepository.findAllDeviceTypes();
            return results;
        } catch(err) {
            throw err;
        }
    }

    createDevice = async ({ name, deviceTypeId, imei, sim1, sim2 }) => {
        try {
            let device = await this.deviceRepository.findDeviceByImei(imei);
            if (device) {
                this.logger.error('DeviceService: Device already exists', device);
                throw new ForbiddenError('IMEI number already exists');
            }

            device = await this.deviceRepository.findDeviceByName(name);
            if (device) {
                this.logger.error('DeviceService: Device already exists', device);
                throw new ForbiddenError('Device name already exists');
            }

            device = await this.deviceRepository.createDevice({ name, deviceTypeId, imei, sim1, sim2 });

            return device;
        } catch(err) {
            throw err;
        }
    }

    findAllDevices = async () => {
        try {
            const results = await this.deviceRepository.findAllDevices();
            return results;
        } catch(err) {
            throw err;
        }
    }
}


export default DeviceService;