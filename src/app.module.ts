import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { AppService } from './app.service';

import { environments } from './enviroments';
import appConfig from './config';
import { appConfigSchema } from './config/config.scheman';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV || 'dev'],
      load: [appConfig],
      isGlobal: true,
      validationSchema: appConfigSchema,
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
