import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';

@Injectable()
export class BrandsService {
  private counterId = 2;
  private brands: Brand[] = [
    {
      id: '1',
      name: 'Brand 1',
      image: 'https://example.com/brand1.jpg',
    },
    {
      id: '2',
      name: 'Brand 2',
      image: 'https://example.com/brand2.jpg',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) throw new NotFoundException(`Brand #${id} not found`);

    return brand;
  }

  create(data: CreateBrandDto) {
    this.counterId++;

    const newBrand: Brand = {
      id: this.counterId.toString(),
      ...data,
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: string, changes: UpdateBrandDto) {
    const index = this.brands.findIndex((brand) => brand.id === id);

    if (index === -1) throw new NotFoundException(`Brand #${id} not found`);

    this.brands[index] = {
      ...this.brands[index],
      ...changes,
    };

    return this.brands[index];
  }

  delete(id: string) {
    const index = this.brands.findIndex((brand) => brand.id === id);

    if (index === -1) throw new NotFoundException(`Brand #${id} not found`);

    const deletedBrand = this.brands[index];
    this.brands.splice(index, 1);

    return deletedBrand;
  }
}
