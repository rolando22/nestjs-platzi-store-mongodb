import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  CreateOrderItemDto,
  OrderItemQueryDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async findAll(filters?: OrderItemQueryDto): Promise<OrderItem[]> {
    const { limit, offset } = filters!;

    const orderItems = await this.orderItemsRepository.find({
      relations: { order: { customer: true }, product: true },
      take: limit,
      skip: offset,
    });

    return orderItems;
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOne({
      where: { id },
      relations: { order: { customer: true }, product: true },
    });

    if (!orderItem) throw new NotFoundException(`OrderItem #${id} not found.`);

    return orderItem;
  }

  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    const newOrderItem = this.orderItemsRepository.create(data);
    const order = await this.ordersRepository.findOne({
      where: { id: data.orderId },
      relations: { customer: true },
    });

    if (!order)
      throw new NotFoundException(`Order #${data.orderId} not found.`);

    const product = await this.productsRepository.findOne({
      where: { id: data.productId },
    });

    if (!product)
      throw new NotFoundException(`Product #${data.productId} not found.`);

    newOrderItem.order = order;
    newOrderItem.product = product;
    const savedOrderItem = await this.orderItemsRepository.save(newOrderItem);
    return savedOrderItem;
  }

  async update(id: number, changes: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    this.orderItemsRepository.merge(orderItem, changes);

    if (!orderItem) throw new NotFoundException(`OrderItem #${id} not found.`);

    if (changes.orderId) {
      const order = await this.ordersRepository.findOne({
        where: { id: changes.orderId },
        relations: { customer: true },
      });

      if (!order)
        throw new NotFoundException(`Order #${changes.orderId} not found.`);

      orderItem.order = order;
    }

    if (changes.productId) {
      const product = await this.productsRepository.findOne({
        where: { id: changes.productId },
      });

      if (!product)
        throw new NotFoundException(`Product #${changes.productId} not found.`);

      orderItem.product = product;
    }

    const savedOrderItem = await this.orderItemsRepository.save(orderItem);
    return savedOrderItem;
  }

  async delete(id: number): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    await this.orderItemsRepository.delete(orderItem.id);
    return orderItem;
  }
}
