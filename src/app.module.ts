import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
