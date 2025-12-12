class ClusterController {

    constructor(clusterService) {
        this.clusterService = clusterService;
    }

    createCluster = async (req, res, next) => {
        try {
            const { name } = req.body;
            const cluster = await this.clusterService.createCluster(name);
            return res.status(201).json({ message: 'New cluster created successfully', cluster });
        } catch(err) {
            next(err);
        }
    }

    findAllClusters = async (req, res, next) => {
        try {
            const results = await this.clusterService.findAllClusters();
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }
}


export default ClusterController;