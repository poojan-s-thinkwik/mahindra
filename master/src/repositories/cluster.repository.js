class ClusterRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    createCluster = async (name) => {
        const results = await this.prisma.cluster.create({ data: { name } });
        return results;
    }

    findAllClusters = async () => {
        const results = await this.prisma.cluster.findMany();
        return results;
    }
}


export default ClusterRepository;