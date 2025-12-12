class ReportController {

    constructor(reportService) {
        this.reportService = reportService
    }

    getParkedReport = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const results = await this.reportService.generateParkedReport({ startDate, endDate });
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    getIdleReport = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const results = await this.reportService.generateIdleReport({ startDate, endDate });
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    getDistanceReport = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const results = await this.reportService.generateDistanceReport({ startDate, endDate });
            return res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }
}

export default ReportController;