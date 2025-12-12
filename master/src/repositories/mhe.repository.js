class MheRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    createMhe = async ({ name, code, warehouseId, deviceId, isActive }) => {
        const results = this.prisma.MHE.create({ data: { name, code, warehouseId, deviceId, isActive } });
        return results;
    }

    findMheByDevice = async (deviceId) => {
        const results = await this.prisma.MHE.findUnique({ where: { deviceId } });
        return results;
    }

    findAllMheByWarehouse = async (warehouseId) => {
        const results = await this.prisma.MHE.findMany({
             where: { warehouseId },
             include: {
                device: {
                    select: {
                        name: true,
                        imei: true
                    }
                },
                warehouse: {
                    select: {
                        name: true
                    }
                }
             } 
        });
        return results;
    }

    findAllMhes = async () => {
        const results = await this.prisma.MHE.findMany({
            select: { 
                id: true,
                name: true,
                warehouseId: true,
                device: { select: { id: true, name: true, imei: true } }
            },
        });
        return results;
    }

    findMheById = async (id) => {
        const results = await this.prisma.MHE.findUnique({ 
            where: { id },
            select: { 
                id: true,
                name: true,
                warehouseId: true,
                device: { select: { id: true, name: true, imei: true } }
            },
        });
        return results;
    }

    updateMhe = async ({ id, name, deviceId, warehouseId }) => {
        await this.prisma.MHE.update({
            where: { id },
            data: { name, deviceId, warehouseId }
        })
    }

    deleteMhe = async (id) => {
        await this.prisma.MHE.delete({ where: { id } });
        return;
    }

    findMheByNameAndWarehouse = async ({name, warehouseId}) => {
        const results = await this.prisma.MHE.findFirst({
            where: {
                name,
                warehouseId
            }
        });
        return results;
    }

    
}

export default MheRepository;