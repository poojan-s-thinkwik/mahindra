class WarehouseRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    findAllStates = async () => {
        const results = await this.prisma.state.findMany();
        return results;
    }

    createWarehouse = async ({name, code, stateId, address, latitude, longitude}) => {
        const results = await this.prisma.warehouse.create({ data: { name, code, stateId, address, latitude, longitude }});
        return results;
    }

    findAllWarehouse = async () => {
        const results = await this.prisma.warehouse.findMany({
            include: {
                state: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return results;
    }

    createShift = async ({ name, warehouseId, startTime, endTime, teaBreakStartTime, teaBreakEndTime, lunchBreakStartTime, lunchBreakEndTime, setupStartTime, setupEndTime, bioBreakStartTime, bioBreakEndTime }) => {
        const results = await this.prisma.shift.create({ data: { name, warehouseId, startTime, endTime, teaBreakStartTime, teaBreakEndTime, lunchBreakStartTime, lunchBreakEndTime, setupStartTime, setupEndTime, bioBreakStartTime, bioBreakEndTime }});
        return results;
    }

    findShiftByNameAndWarehouse = async ({ name, warehouseId }) => {
        const results = await this.prisma.shift.findUnique({ 
            where: { name_warehouseId: { name, warehouseId }},
            include: {
                warehouse: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return results;
    }

    findAllShiftByWarehouse = async (warehouseId) => {
        const results = await this.prisma.shift.findMany({ 
            where: { warehouseId },
            include: {
                warehouse: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return results;
    }

    findShiftById = async (id) => {
        const results = await this.prisma.shift.findUnique({
            where: { id },
            include: {
                warehouse: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return results;
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
        const results = await this.prisma.shift.update({
            where: { id },
            data: {
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
            }
        });
        return results;
    }

    deleteShift = async (id) => {
        const results = await this.prisma.shift.delete({ where: { id }});
        return results;
    }

    findWarehouseByName = async (name) => {
        const results = await this.prisma.warehouse.findFirst({
            where: { name }
        })

        return results;
    }

    updateWarehouse = async ({ id, name, stateId, address, latitude, longitude }) => {
        const results = await this.prisma.warehouse.update({
            where: { id },
            data: { stateId, name, address, latitude, longitude }
        });
        return results;
    }

    findWarehouseById = async (id) => {
        const results = await this.prisma.warehouse.findUnique({
            where: { id }
        });
        return results;
    }
}

export default WarehouseRepository