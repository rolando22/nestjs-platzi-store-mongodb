import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from 'src/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    const categories = this.categoriesService.findAll();

    return {
      data: categories,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(id);

    return {
      data: category,
    };
  }

  @Post()
  create(@Body() body: any) {
    const newCategory = this.categoriesService.create(body);

    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const category = this.categoriesService.update(id, body);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const category = this.categoriesService.delete(id);

    return {
      message: 'Category deleted successfully',
      data: category,
    };
  }
}
