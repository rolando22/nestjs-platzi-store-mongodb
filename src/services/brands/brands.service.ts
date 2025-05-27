import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 2;
  private brands: Brand[] = [
    {
      id: '1',
      name: 'Brand 1',
      description: 'Description of Brand 1',
      image: 'https://example.com/brand1.jpg',
    },
    {
      id: '2',
      name: 'Brand 2',
      description: 'Description of Brand 2',
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

  create(data: any) {
    this.counterId++;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newBrand: Brand = {
      id: this.counterId.toString(),
      ...data,
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: string, changes: any) {
    const index = this.brands.findIndex((brand) => brand.id === id);

    if (index === -1) throw new NotFoundException(`Brand #${id} not found`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
