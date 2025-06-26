import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { OrderItemsService } from 'src/users/services/order-items/order-items.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  async getAll() {
    const orderItems = await this.orderItemsService.findAll();

    return {
      data: orderItems,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a order item by ID' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const orderItem = await this.orderItemsService.findOne(id);

    return {
      data: orderItem,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  async create(@Body() body: CreateOrderItemDto) {
    const newOrderItem = await this.orderItemsService.create(body);

    return {
      message: 'Order item created successfully',
      data: newOrderItem,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order item' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateOrderItemDto,
  ) {
    const orderItem = await this.orderItemsService.update(id, body);

    return {
      message: 'Order item updated successfully',
      data: orderItem,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a order item by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const orderItem = await this.orderItemsService.delete(id);

    return {
      message: 'Order item deleted successfully',
      data: orderItem,
    };
  }
}
