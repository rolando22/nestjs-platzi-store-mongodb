import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductsService } from 'src/products/services/products/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';

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
  create(@Body() body: CreateProductDto) {
    const newProduct = this.productsService.create(body);

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
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
