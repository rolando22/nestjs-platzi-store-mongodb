import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { OrdersService } from 'src/users/services/orders/orders.service';
import {
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from 'src/users/dtos/order.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  async getAll(@Query() query: OrderQueryDto) {
    const orders = await this.ordersService.findAll(query);

    return {
      data: orders,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a order by ID' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const order = await this.ordersService.findOne(id);

    return {
      data: order,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() body: CreateOrderDto) {
    const newOrder = await this.ordersService.create(body);

    return {
      message: 'Order created successfully',
      data: newOrder,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(id, body);

    return {
      message: 'Order updated successfully',
      data: order,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a order by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const order = await this.ordersService.delete(id);

    return {
      message: 'Order deleted successfully',
      data: order,
    };
  }
}
