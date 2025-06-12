import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from '../brands/brands.service';
import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  async findAll() {
    const products = await this.productsRepository.find({
      relations: { brand: true },
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { brand: true },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productsRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }

    const savedProduct = await this.productsRepository.save(newProduct);
    return savedProduct;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
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
}
