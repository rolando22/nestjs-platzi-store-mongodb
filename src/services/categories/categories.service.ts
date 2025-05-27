import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 2;
  private categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Devices and gadgets',
      image: 'https://example.com/electronics.jpg',
    },
    {
      id: '2',
      name: 'Clothing',
      description: 'Apparel and accessories',
      image: 'https://example.com/clothing.jpg',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const category = this.categories.find((category) => category.id === id);

    if (!category) throw new NotFoundException(`Category #${id} not found`);

    return category;
  }

  create(data: CreateCategoryDto) {
    this.counterId++;

    const newCategory: Category = {
      id: this.counterId.toString(),
      ...data,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: string, changes: UpdateCategoryDto) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index === -1) throw new NotFoundException(`Category #${id} not found`);

    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };

    return this.categories[index];
  }

  delete(id: string) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index === -1) throw new NotFoundException(`Category #${id} not found`);

    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);

    return deletedCategory;
  }
}
