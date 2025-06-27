import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(filters?: ProductQueryDto): Promise<Product[]> {
    const { limit = 10, offset = 0, minPrice, maxPrice } = filters!;
    const queryFilters: FilterQuery<Product> = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
      queryFilters.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      queryFilters.price = { $gte: minPrice };
    }

    const products = await this.productModel
      .find(queryFilters)
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).lean().exec();

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(data);
    const savedProduct = await newProduct.save();
    return savedProduct.toObject();
  }

  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return deletedProduct;
  }

  // async addCategoryToProduct(
  //   productId: number,
  //   categoryId: number,
  // ): Promise<Product> {
  //   const product = await this.findOne(productId);
  //   const category = await this.categoriesRepository.findOne({
  //     where: { id: categoryId },
  //   });

  //   if (!category) {
  //     throw new NotFoundException(`Category #${categoryId} not found`);
  //   }

  //   product.categories.push(category);
  //   const savedProduct = await this.productsRepository.save(product);
  //   return savedProduct;
  // }

  // async deleteCategoryFromProduct(
  //   productId: number,
  //   categoryId: number,
  // ): Promise<Product> {
  //   const product = await this.findOne(productId);
  //   const category = await this.categoriesRepository.findOne({
  //     where: { id: categoryId },
  //   });

  //   if (!category) {
  //     throw new NotFoundException(`Category #${categoryId} not found`);
  //   }

  //   product.categories = product.categories.filter(
  //     (cat) => cat.id !== category.id,
  //   );
  //   const savedProduct = await this.productsRepository.save(product);
  //   return savedProduct;
  // }
}
