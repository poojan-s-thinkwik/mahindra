import express from 'express';
import config from './config.js';
import cors from 'cors';

import { NotFoundError, ServerError } from './utils/custom-error.js';
import { AppLogger } from './utils/app-logger.js';

import routes from './routes/index.js';

const app = express();
const logger = new AppLogger();

app.use(cors());
app.use(express.json());


app.use('/api/v1', routes);

app.use((req, res, next) => {
    const error = new NotFoundError();
    next(error);
})

app.use((error, req, res, next) => {

    if (!(error instanceof ServerError)) {
    } else {
        logger.error('Server error: error', error.stack);
        error = new ServerError();
    }


    const responseBody = {
        status: error.statusCode || 500,
        message: error.message,
        error: config.nodeEnv == 'dev' ? error.stack : undefined, // Show stack trace in development
    }


    return res.status(responseBody.status).json(responseBody);
});

app.listen(config.port, () => {
    logger.info(`Server started at port ${config.port}`, new Date());
})