import dotenv from 'dotenv';
dotenv.config();

const config =  {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    rabbitmqUrl: process.env.RABBITMQ_URL
}

export default config;