import pool from "../database/connect.js";

import ReportController from "./report.controller.js";
import ReportService from "../services/report.service.js";
import ReportRepository from "../repositories/report.repository.js";

const reportRepository = new ReportRepository(pool);
const reportService = new ReportService(reportRepository);
export const reportController = new ReportController(reportService);