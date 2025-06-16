import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import {
  BrandQueryDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}

  async findAll(filters?: BrandQueryDto): Promise<Brand[]> {
    const { limit, offset } = filters!;

    const brands = await this.brandsRepository.find({
      take: limit,
      skip: offset,
    });

    return brands;
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!brand) throw new NotFoundException(`Brand #${id} not found`);

    return brand;
  }

  async create(data: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandsRepository.create(data);
    await this.brandsRepository.save(newBrand);
    return newBrand;
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    this.brandsRepository.merge(brand, changes);
    const updatedBrand = await this.brandsRepository.save(brand);
    return updatedBrand;
  }

  async delete(id: number): Promise<Brand> {
    const brand = await this.findOne(id);
    await this.brandsRepository.delete(brand.id);
    return brand;
  }
}
