import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/users/entities/order.entity';
import {
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from 'src/users/dtos/order.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(filters?: OrderQueryDto): Promise<Order[]> {
    const { limit, offset } = filters!;

    const orders = await this.ordersRepository.find({
      relations: { customer: true },
      take: limit,
      skip: offset,
    });

    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { customer: true, items: { product: true } },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const newOrder = new Order();
    const customer = await this.customersRepository.findOne({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer #${data.customerId} not found`);
    }

    newOrder.customer = customer;

    const savedOrder = await this.ordersRepository.save(newOrder);
    return savedOrder;
  }

  async update(id: number, changes: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    if (changes.customerId) {
      const customer = await this.customersRepository.findOne({
        where: { id: changes.customerId },
      });

      if (!customer) {
        throw new NotFoundException(
          `Customer #${changes.customerId} not found`,
        );
      }

      order.customer = customer;
    }
    const updatedOrder = await this.ordersRepository.save(order);
    return updatedOrder;
  }

  async delete(id: number): Promise<Order> {
    const order = await this.findOne(id);
    await this.ordersRepository.delete(order.id);
    return order;
  }
}
