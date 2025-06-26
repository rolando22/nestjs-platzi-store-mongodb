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
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

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
  async getOne(@Param('id', MongoIdPipe) id: string) {
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
  @ApiOperation({ summary: 'Update a existing product' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, body);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  // @Put(':id/category/:categoryId')
  // @ApiOperation({ summary: 'Add category to a existing product' })
  // async addCategoryToProduct(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  // ) {
  //   const product = await this.productsService.addCategoryToProduct(
  //     id,
  //     categoryId,
  //   );

  //   return {
  //     message: 'Category added to Product successfully',
  //     data: product,
  //   };
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const product = await this.productsService.delete(id);

    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }

  // @Delete(':id/category/:categoryId')
  // @ApiOperation({ summary: 'Delete a category from product by ID' })
  // async deleteCategoryFromProduct(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  // ) {
  //   const product = await this.productsService.deleteCategoryFromProduct(
  //     id,
  //     categoryId,
  //   );

  //   return {
  //     message: 'Category deleted from product successfully',
  //     data: product,
  //   };
  // }
}
