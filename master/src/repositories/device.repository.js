class DeviceRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    createDeviceType = async (name, ip, port) => {
        const results = await this.prisma.deviceType.create({ data: { name, ip, port }});
        return results;
    }

    findDeviceTypeByName = async (name) => {
        const results = await this.prisma.deviceType.findUnique({ where: { name }});
        return results;
    }

    findAllDeviceTypes = async () => {
        const results = await this.prisma.deviceType.findMany();
        return results;
    }

    createDevice = async ({ name, deviceTypeId, imei, sim1, sim2 }) => {
        const results = await this.prisma.device.create({ data: { name, deviceTypeId, imei, sim1, sim2 }});
        return results;
    }

    findDeviceByImei = async (imei) => {
        const results = await this.prisma.device.findUnique({ where: { imei }});
        return results;
    }

    findDeviceByName = async (name) => {
        const results = await this.prisma.device.findUnique({ where: { name }});
        return results;
    }

    findAllDevices = async () => {
        const results = await this.prisma.device.findMany({
            include: {
                deviceType: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return results;
    }
}

export default DeviceRepository;