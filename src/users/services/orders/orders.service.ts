import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from 'src/users/entities/order.entity';
import {
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from 'src/users/dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll(filters?: OrderQueryDto): Promise<Order[]> {
    const { limit = 10, offset = 0 } = filters!;

    const orders = await this.orderModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return orders;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(data);
    const savedOrder = await newOrder.save();
    return savedOrder.toObject();
  }

  async update(id: string, changes: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return updatedOrder;
  }

  async delete(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return deletedOrder;
  }
}
