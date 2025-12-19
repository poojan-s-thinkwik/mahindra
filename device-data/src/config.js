import dotenv from 'dotenv';
dotenv.config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    rabbitmqUrl: process.env.RABBITMQ_URL,
    authKey: process.env.AUTH_KEY,
    systemApiKey: process.env.SYSTEM_API_KEY
}

export default config;