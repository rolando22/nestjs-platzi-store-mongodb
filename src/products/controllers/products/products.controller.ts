import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  async getAll() {
    const products = await this.productsService.findAll();

    return {
      data: products,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);

    return {
      data: product,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() body: CreateProductDto) {
    const newProduct = await this.productsService.create(body);

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, body);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.delete(id);

    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
