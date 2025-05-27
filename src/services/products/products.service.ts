import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/entities/product.estity';
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
    const product = this.products.find((item) => item.id === id);

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
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1)
      throw new NotFoundException(`Product #${id} not found`);

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...changes,
    };

    return this.products[productIndex];
  }

  delete(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1)
      throw new NotFoundException(`Product #${id} not found`);

    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return deletedProduct;
  }
}
