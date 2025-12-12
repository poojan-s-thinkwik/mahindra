import dotenv from 'dotenv';
dotenv.config();

const config =  {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    authKey: process.env.AUTH_KEY
}

export default config;