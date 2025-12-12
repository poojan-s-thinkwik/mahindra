import express from 'express';
import config from './config.js';
import { AppLogger } from './utils/app-logger.js';
import RabbitMQ from './services/rabbit-mq.service.js';
import Api from './services/api.service.js';

const app = express();
const logger = new AppLogger();
const rabbitMq = new RabbitMQ();

// refresh devices
const api = new Api();

setInterval(async () => {
    try {
        const results = await api.request({ url: '/mhe' });
        rabbitMq.devices = results;
    } catch(err) {
        console.log(err);
    }
}, 5 * 1000);

app.listen(config.port, () => logger.info(`Server started at ${config.port}`));