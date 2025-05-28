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

import { BrandsService } from 'src/products/services/brands/brands.service';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  getAll() {
    const brands = this.brandsService.findAll();

    return {
      data: brands,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  getOne(@Param('id') id: string) {
    const brand = this.brandsService.findOne(id);

    return {
      data: brand,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  create(@Body() body: CreateBrandDto) {
    const newBrand = this.brandsService.create(body);

    return {
      message: 'Brand created successfully',
      data: newBrand,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing brand' })
  update(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    const brand = this.brandsService.update(id, body);

    return {
      message: 'Brand updated successfully',
      data: brand,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  delete(@Param('id') id: string) {
    const brand = this.brandsService.delete(id);

    return {
      message: 'Brand deleted successfully',
      data: brand,
    };
  }
}
