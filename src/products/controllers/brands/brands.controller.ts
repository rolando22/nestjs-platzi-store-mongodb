import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BrandsService } from 'src/products/services/brands/brands.service';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dtos';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll() {
    const brands = this.brandsService.findAll();

    return {
      data: brands,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const brand = this.brandsService.findOne(id);

    return {
      data: brand,
    };
  }

  @Post()
  create(@Body() body: CreateBrandDto) {
    const newBrand = this.brandsService.create(body);

    return {
      message: 'Brand created successfully',
      data: newBrand,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    const brand = this.brandsService.update(id, body);

    return {
      message: 'Brand updated successfully',
      data: brand,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const brand = this.brandsService.delete(id);

    return {
      message: 'Brand deleted successfully',
      data: brand,
    };
  }
}
