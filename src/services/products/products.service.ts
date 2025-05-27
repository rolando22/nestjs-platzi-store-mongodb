import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dtos';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: '1',
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      image: 'https://example.com/product1.jpg',
      categoryId: '1',
      brandId: '1',
      stock: 10,
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'Description of Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
      categoryId: '2',
      brandId: '2',
      stock: 20,
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
