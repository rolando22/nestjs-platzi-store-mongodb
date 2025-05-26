import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getAll() {
    return {
      data: [],
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      data: {
        id,
      },
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      message: 'Category created successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: body,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      message: 'Category updated successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        id,
        ...body,
      },
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      message: 'Category deleted successfully',
      data: {
        id,
      },
    };
  }
}
