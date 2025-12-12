import { ValidationError } from "../../../03-auth/src/utils/custom-error.js";

class ClusterService {

    constructor(clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    createCluster = async (name) => {
        try {
            const name = name.trim();
            if (!name || name.length < 2 || name.length > 50) {
                throw new ValidationError("Invalid cluster name");
            }

            const cluster = await this.clusterRepository.createCluster(name);

            return cluster;
        } catch(err) {
            throw err;
        }
    }

    findAllClusters = async () => {
        try {
            const results = await this.clusterRepository.findAllClusters();
            return results;
        } catch(err) {
            throw err;
        }
    }
}


export default ClusterService;