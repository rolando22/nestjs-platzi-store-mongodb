import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  getAll() {
    const products = this.productsService.findAll();

    return {
      data: products,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  getOne(@Param('id') id: string) {
    const product = this.productsService.findOne(id);

    return {
      data: product,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() body: CreateProductDto) {
    const newProduct = this.productsService.create(body);

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const product = this.productsService.update(id, body);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  delete(@Param('id') id: string) {
    const product = this.productsService.delete(id);

    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
