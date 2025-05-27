import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { BrandsService } from './services/brands/brands.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, CategoriesService, BrandsService],
})
export class AppModule {}
