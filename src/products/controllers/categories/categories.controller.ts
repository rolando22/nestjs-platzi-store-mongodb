import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CategoriesService } from 'src/products/services/categories/categories.service';
import {
  CategoryQueryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async getAll(@Query() query: CategoryQueryDto) {
    const categories = await this.categoriesService.findAll(query);

    return {
      data: categories,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const category = await this.categoriesService.findOne(id);

    return {
      data: category,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Body() body: CreateCategoryDto) {
    const newCategory = await this.categoriesService.create(body);

    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, body);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const category = await this.categoriesService.delete(id);

    return {
      message: 'Category deleted successfully',
      data: category,
    };
  }
}
