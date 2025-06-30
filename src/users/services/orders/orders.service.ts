import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Order } from 'src/users/entities/order.entity';
import {
  AddItemToOrderDto,
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from 'src/users/dtos/order.dto';
import { Product } from 'src/products/entities/product.entity';
import { OrderItem } from 'src/users/entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(filters?: OrderQueryDto): Promise<Order[]> {
    const { limit = 10, offset = 0 } = filters!;

    const orders = await this.orderModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('customer', 'name lastName')
      .populate('items.product', 'name price')
      .lean()
      .exec();

    return orders;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('customer', 'name lastName')
      .populate('items.product', 'name price')
      .lean()
      .exec();

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

  async addAndUpdateItemToOrder(
    id: string,
    productId: string,
    data: AddItemToOrderDto,
  ): Promise<Order> {
    const product = await this.productModel.findById(productId).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const order = await this.orderModel
      .findById(id)
      .populate('customer', 'name lastName')
      .populate('items.product', 'name price')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const itemIndex = order.items.findIndex(
      (item) => (item.product._id as Types.ObjectId).toString() === productId,
    );

    if (itemIndex !== -1) {
      order.items[itemIndex].quantity = data.quantity;
    } else {
      const item = new OrderItem();
      item.quantity = data.quantity;
      item.product = product;
      order.items.push(item);
    }

    const savedOrder = await order.save();

    return savedOrder.toObject();
  }

  async removeItemFromOrder(id: string, itemId: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('customer', 'name lastName')
      .populate('items.product', 'name price')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.items.pull(itemId);

    const savedOrder = await order.save();

    return savedOrder.toObject();
  }
}
