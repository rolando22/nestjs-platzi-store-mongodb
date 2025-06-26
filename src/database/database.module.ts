import { Global, Module } from '@nestjs/common';

import { databaseConnection, mongooseDatabaseConnection } from './connection';
import appConfig from '../config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: mongooseDatabaseConnection,
      inject: [appConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: databaseConnection,
      inject: [appConfig.KEY],
    },
  ],
  exports: ['MONGO_CLIENT', MongooseModule],
})
export class DatabaseModule {}
