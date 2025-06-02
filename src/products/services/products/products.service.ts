import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      stock: 10,
      image: 'https://example.com/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 200,
      stock: 20,
      image: 'https://example.com/product2.jpg',
    },
  ];

  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.productsRepository.find();
    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productsRepository.create(data);
    const savedProduct = await this.productsRepository.save(newProduct);
    return savedProduct;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
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
