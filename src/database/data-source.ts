import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || '5432'),
  username: process.env.TYPEORM_USERNAME || 'root',
  password: process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.TYPEORM_DATABASE || 'my_db',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
