class UserRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    addUser = async ({ name, roleId, email, password, isActive }) => {
        const results = await this.prisma.user.create({ data: { name, email, roleId, password, isActive } });
        return results;
    }

    findAllRoles = async () => {
        const results = await this.prisma.Role.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                sortOrder: 'asc'
            }
        });
        return results;
    }

    findUserByEmail = async (email) => {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    findAllUsers = async () => {
        const results = await this.prisma.user.findMany({
            include: {
                role: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                roleId: 'asc'
            }
        });
        return results;
    }

    findUserById = async (id) => {
        const results = await this.prisma.user.findUnique({
            where: { id }
        });
        return results;
    }

    deleteUser = async (id) => {
        const results = await this.prisma.user.delete({
            where: { id }
        })

        return results;
    }

    updateUser = async ({ id, name, email, roleId, isActive }) => {
        const results = await this.prisma.user.update({
            where: { id },
            data: { name, email, roleId, isActive }
        })
        return results;
    }
}


export default UserRepository;