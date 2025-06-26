import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'local',
  port: Number(process.env.PORT) || 3000,
  database: {
    postgres: {
      user: process.env.POSTGRES_USER || '',
      host: process.env.POSTGRES_HOST || '',
      dbName: process.env.POSTGRES_DB || '',
      password: process.env.POSTGRES_PASSWORD || '',
      port: Number(process.env.POSTGRES_PORT) || 5432,
    },
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME || '',
      host: process.env.MONGO_HOST || '',
      dbName: process.env.MONGO_DB || '',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || '',
      port: Number(process.env.MONGO_PORT) || 27017,
      connection: process.env.MONGO_CONNECTION,
    },
  },
}));
