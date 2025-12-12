import express from 'express';
import config from './config.js';
import cors from 'cors';
import router from './routes/index.js';
import systemApiRouter from './routes/system-api.js';
import { NotFoundError, ServerError } from './utils/custom-error.js';
import { AppLogger } from './utils/app-logger.js';
import AuthMiddleware from './middlewares/auth.middleware.js';


const app = express();
const logger = new AppLogger();

app.use(cors());
app.use(express.json());

app.use('/api/v1', AuthMiddleware.verifyToken, router);
app.use('/system-api/v1', AuthMiddleware.verifyApiKey, systemApiRouter);

app.use((req, res, next) => {
    const error = new NotFoundError();
    next(error);
})

app.use((error, req, res, next) => {

    if (!(error instanceof ServerError)) {
    } else {
        error = new ServerError();
    }


    logger.error('App: error', error);
    
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