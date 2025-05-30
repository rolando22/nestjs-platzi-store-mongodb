import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConnection, typeOrmDatabaseConnection } from './connection';
import appConfig from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmDatabaseConnection,
      inject: [appConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: 'PG_CLIENT',
      useFactory: databaseConnection,
      inject: [appConfig.KEY],
    },
  ],
  exports: ['PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}
