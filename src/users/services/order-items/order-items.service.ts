import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderItem } from 'src/users/entities/order-item.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    const orderItems = await this.orderItemModel.find().exec();
    return orderItems;
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemModel.findById(id).exec();

    if (!orderItem) throw new NotFoundException(`OrderItem #${id} not found.`);

    return orderItem;
  }

  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    const newOrderItem = new this.orderItemModel(data);
    const savedOrderItem = await newOrderItem.save();
    return savedOrderItem.toObject();
  }

  async update(id: string, changes: UpdateOrderItemDto): Promise<OrderItem> {
    const updatedOrderItem = await this.orderItemModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedOrderItem) {
      throw new NotFoundException(`OrderItem #${id} not found.`);
    }

    return updatedOrderItem;
  }

  async delete(id: string): Promise<OrderItem> {
    const deletedOrderItem = await this.orderItemModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedOrderItem) {
      throw new NotFoundException(`OrderItem #${id} not found.`);
    }

    return deletedOrderItem;
  }
}
