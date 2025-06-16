import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import {
  CategoryQueryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(filters?: CategoryQueryDto): Promise<Category[]> {
    const { limit, offset } = filters!;

    const categories = await this.categoriesRepository.find({
      take: limit,
      skip: offset,
    });

    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!category) throw new NotFoundException(`Category #${id} not found`);

    return category;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(data);
    const savedCategory = await this.categoriesRepository.save(newCategory);
    return savedCategory;
  }

  async update(id: number, changes: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    this.categoriesRepository.merge(category, changes);
    const updatedCategory = await this.categoriesRepository.save(category);
    return updatedCategory;
  }

  async delete(id: number): Promise<Category> {
    const category = await this.findOne(id);
    await this.categoriesRepository.delete(id);
    return category;
  }
}
