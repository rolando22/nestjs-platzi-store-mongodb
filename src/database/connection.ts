import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import appConfig from '../config';

export const databaseConnection = async (
  config: ConfigType<typeof appConfig>,
) => {
  const { user, host, dbName, password, port } = config.database.postgres;

  const client = new Client({
    user,
    host,
    database: dbName,
    password,
    port,
  });

  try {
    await client.connect();
    console.log(
      `Database connected into ${client.database} on port ${client.port}`,
    );
  } catch (error) {
    console.error('Database connection error', error);
  }
};
