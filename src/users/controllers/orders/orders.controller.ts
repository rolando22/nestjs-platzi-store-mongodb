import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { OrdersService } from 'src/users/services/orders/orders.service';
import {
  AddItemToOrderDto,
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from 'src/users/dtos/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
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

  @Post(':id/product/:productId')
  @ApiOperation({ summary: 'Create a new order item' })
  async addAndUpdateItemToOrder(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
    @Body() body: AddItemToOrderDto,
  ) {
    const newOrder = await this.ordersService.addAndUpdateItemToOrder(
      id,
      productId,
      body,
    );

    return {
      message: 'Order item created/updated successfully',
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

  @Delete(':id/item/:itemId')
  @ApiOperation({ summary: 'Delete a order by ID' })
  async removeItemFromOrder(
    @Param('id', MongoIdPipe) id: string,
    @Param('itemId', MongoIdPipe) itemId: string,
  ) {
    const order = await this.ordersService.removeItemFromOrder(id, itemId);

    return {
      message: 'Order item deleted successfully',
      data: order,
    };
  }
}
