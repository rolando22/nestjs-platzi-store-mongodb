import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import appConfig from '../config';

export const databaseConnection = async (
  config: ConfigType<typeof appConfig>,
) => {
  const { connection, user, password, host, port, dbName } =
    config.database.mongo;
  const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    console.log(
      `Database connected into ${database.databaseName} on port ${port}`,
    );
    return database;
  } catch (error) {
    console.error('Database connection error', error);
  }
};

export const mongooseDatabaseConnection = (
  config: ConfigType<typeof appConfig>,
) => {
  const { connection, user, password, host, port, dbName } =
    config.database.mongo;

  console.log(`Database connected into ${dbName} on port ${port}`);

  return {
    uri: `${connection}://${host}:${port}`,
    user,
    pass: password,
    dbName,
  };
};
