import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { databaseConnection, mongooseDatabaseConnection } from './connection';
import appConfig from '../config';

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
