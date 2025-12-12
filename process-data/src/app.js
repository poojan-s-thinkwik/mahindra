import express from 'express';
import config from './config.js';
import { AppLogger } from './utils/app-logger.js';
import ProcessData from './services/process-data.service.js';
import Report from './services/report.service.js';

const app = express();
const logger = new AppLogger();
const processData = new ProcessData();
const report = new Report();


setInterval(async () => {
    try {
        const mheData = await processData.readData();
        const mheDataArr = Object.values(mheData);
        
        for(let i = 0; i < mheDataArr.length; i ++) {
            const data = mheDataArr[i];
            await report.generateReport(data);
        };
    } catch(err) {
        console.log(err);
    }
}, 5 * 1000);

app.listen(config.port, () => logger.info(`Server started at ${config.port}`));