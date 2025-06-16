import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  Repository,
  FindOptionsWhere,
  Between,
  MoreThanOrEqual,
} from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import { Category } from 'src/products/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(filters?: ProductQueryDto) {
    const { limit, offset, minPrice, maxPrice } = filters!;

    const where: FindOptionsWhere<Product> = {};

    if (minPrice && maxPrice) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice) {
      where.price = MoreThanOrEqual(minPrice);
    }

    const products = await this.productsRepository.find({
      where,
      relations: { brand: true, categories: true },
      take: limit,
      skip: offset,
    });

    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productsRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandsRepository.findOne({
        where: { id: data.brandId },
      });
      if (!brand)
        throw new NotFoundException(`Brand #${data.brandId} not found`);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoriesRepository.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    const savedProduct = await this.productsRepository.save(newProduct);
    return savedProduct;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandsRepository.findOne({
        where: { id: changes.brandId },
      });
      if (!brand)
        throw new NotFoundException(`Brand #${changes.brandId} not found`);
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoriesRepository.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }

    this.productsRepository.merge(product, changes);
    const updatedProduct = await this.productsRepository.save(product);
    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.findOne(id);
    await this.productsRepository.delete(product.id);
    return product;
  }

  async addCategoryToProduct(
    productId: number,
    categoryId: number,
  ): Promise<Product> {
    const product = await this.findOne(productId);
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    product.categories.push(category);
    const savedProduct = await this.productsRepository.save(product);
    return savedProduct;
  }

  async deleteCategoryFromProduct(
    productId: number,
    categoryId: number,
  ): Promise<Product> {
    const product = await this.findOne(productId);
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    product.categories = product.categories.filter(
      (cat) => cat.id !== category.id,
    );
    const savedProduct = await this.productsRepository.save(product);
    return savedProduct;
  }
}
