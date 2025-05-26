import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    const products = this.productsService.findAll();

    return {
      data: products,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const product = this.productsService.findOne(id);

    return {
      data: product,
    };
  }

  @Post()
  create(@Body() body: any) {
    const newProduct = this.productsService.create(body);

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const product = this.productsService.update(id, body);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const product = this.productsService.delete(id);

    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
