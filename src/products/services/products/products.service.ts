import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      stock: 10,
      image: 'https://example.com/product1.jpg',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 200,
      stock: 20,
      image: 'https://example.com/product2.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  create(data: CreateProductDto) {
    this.counterId++;

    const newProduct: Product = {
      id: this.counterId.toString(),
      ...data,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: string, changes: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw new NotFoundException(`Product #${id} not found`);

    this.products[index] = {
      ...this.products[index],
      ...changes,
    };

    return this.products[index];
  }

  delete(id: string) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw new NotFoundException(`Product #${id} not found`);

    const deletedProduct = this.products[index];
    this.products.splice(index, 1);

    return deletedProduct;
  }
}
