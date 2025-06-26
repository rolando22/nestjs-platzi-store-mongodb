import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec();

    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) throw new NotFoundException(`Category #${id} not found`);

    return category;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(data);
    const savedCategory = await newCategory.save();
    return savedCategory.toObject();
  }

  async update(id: string, changes: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return updatedCategory;
  }

  async delete(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return deletedCategory;
  }
}
