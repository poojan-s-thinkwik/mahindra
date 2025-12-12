import { AppLogger } from "../utils/app-logger.js";
import { generateRandomString } from "../utils/random-string.js";
import { ForbiddenError, NotFoundError, ValidationError } from "../utils/custom-error.js";

class MheService {

    constructor(mheRepository) {
        this.mheRepository = mheRepository;
        this.logger = new AppLogger();
    }

    createMhe = async ({ name, warehouseId, deviceId, isActive }) => {
        try {
            let mhe = await this.mheRepository.findMheByNameAndWarehouse({ name, warehouseId });
            if (mhe) {
                this.logger.warn("MheService: MHE name already exists", mhe);
                throw new ForbiddenError('MHE name already exists');
            }
            mhe = await this.mheRepository.findMheByDevice(deviceId);
            if (mhe) {
                this.logger.error('MheService: MHE already exists for this device', mhe);
                throw new ForbiddenError('Device already in use');
            }

            const code = generateRandomString(6);
            mhe = await this.mheRepository.createMhe({ name, code, warehouseId, deviceId, isActive });
            this.logger.info('MheService: New MHE created', mhe);

            return mhe;
        } catch(err) {
            throw err;
        }
    }

    findAllMhe = async (warehouseId) => {
        try {
            const results = await this.mheRepository.findAllMheByWarehouse(warehouseId);
            return results;
        } catch(err) {
            throw err;
        }
    }

    findAllMhes = async () => {
        try {
            let results = await this.mheRepository.findAllMhes();
            results = results.map(d => ({mheId: d.id, mheName: d.name, deviceId: d.device.id, deviceName: d.device.name, imei: d.device.imei }));
            return results;
        } catch(err) {
            throw err;
        }
    }

    findMhe = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }
            const results = await this.mheRepository.findMheById(id);
            if (!results) {
                throw new NotFoundError('MHE not found.');
            }
            return results;
        } catch(err) {
            throw err;
        }
    }

    updateMhe = async ({ id, name, warehouseId, deviceId }) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }
            const results = await this.mheRepository.findMheById(id);
            if (!results) {
                throw new NotFoundError('MHE not found.');
            }
            
            let mhe = await this.mheRepository.findMheByNameAndWarehouse({ name, warehouseId });
            if (mhe && mhe.id != id) {
                this.logger.warn("MheService: MHE name already exists", mhe);
                throw new ForbiddenError('MHE name already exists');
            }
            mhe = await this.mheRepository.findMheByDevice(deviceId);
            if (mhe && mhe.id != id) {
                this.logger.error('MheService: MHE already exists for this device', mhe);
                throw new ForbiddenError('Device already in use');
            }

            await this.mheRepository.updateMhe({ id, name, warehouseId, deviceId });
            
            return;
        } catch(err) {
            throw err;
        }
    }

    deleteMhe = async (id) => {
        try {
            id = parseInt(id);
            if (isNaN(id)) {
                throw new ValidationError();
            }

            await this.mheRepository.deleteMhe(id);

            return;
        } catch(err) {
            throw err;
        }
    }
}


export default MheService;