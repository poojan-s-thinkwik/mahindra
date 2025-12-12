import dotenv from 'dotenv';
dotenv.config();

const buildConnectionString = () => {
    const userName = process.env.POSTGRESQL_USER_NAME;
    const password = process.env.POSTGRESQL_PASSWORD;
    const host = process.env.POSTGRESQL_HOST;
    const database = process.env.POSTGRESQL_DB;
    const port = process.env.POSTGRESQL_PORT;
  
    return `postgresql://${userName}:${password}@${host}:${port}/${database}`;
};

const config =  {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    rabbitmqUrl: process.env.RABBITMQ_URL,
    connectionString: buildConnectionString()
}

export default config;