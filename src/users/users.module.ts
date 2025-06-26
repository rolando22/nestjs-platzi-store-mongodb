import { Module } from '@nestjs/common';

import { ProductsModule } from 'src/products/products.module';

import { CustomersController } from './controllers/customers/customers.controller';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';

import { CustomersService } from './services/customers/customers.service';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Customer, CustomerSchema } from './entities/customer.entity';
import { OrderItem, OrderItemSchema } from './entities/order-item.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemsService],
})
export class UsersModule {}
