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

import { CategoriesService } from 'src/products/services/categories/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  getAll() {
    const categories = this.categoriesService.findAll();

    return {
      data: categories,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  getOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(id);

    return {
      data: category,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  create(@Body() body: CreateCategoryDto) {
    const newCategory = this.categoriesService.create(body);

    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const category = this.categoriesService.update(id, body);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  delete(@Param('id') id: string) {
    const category = this.categoriesService.delete(id);

    return {
      message: 'Category deleted successfully',
      data: category,
    };
  }
}
