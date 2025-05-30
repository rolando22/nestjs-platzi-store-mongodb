import { Global, Module } from '@nestjs/common';

import { databaseConnection } from './connection';
import appConfig from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CLIENT',
      useFactory: databaseConnection,
      inject: [appConfig.KEY],
    },
  ],
  exports: ['PG_CLIENT'],
})
export class DatabaseModule {}
