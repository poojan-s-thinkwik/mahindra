class ReportRepository {

    constructor(pool) {
        this.pool = pool;
    }

    getParkedReportData = async ({startDate, endDate}) => {
        const q = `SELECT * FROM parked_reports WHERE log_time BETWEEN $1 AND $2 ORDER BY log_time;`;
        const result = await this.pool.query(q, [startDate, endDate]);
        return result.rows;
    }
}

export default ReportRepository;