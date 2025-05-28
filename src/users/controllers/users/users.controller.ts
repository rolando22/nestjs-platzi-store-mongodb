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

import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAll() {
    const users = this.usersService.findAll();

    return {
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  getOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);

    return {
      data: user,
    };
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get orders by user' })
  getOrders(@Param('id') id: string) {
    const orders = this.usersService.getOrdersByUser(id);
    return {
      data: orders,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() body: CreateUserDto) {
    const newUser = this.usersService.create(body);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = this.usersService.update(id, body);

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  delete(@Param('id') id: string) {
    const user = this.usersService.delete(id);

    return {
      message: 'User deleted successfully',
      data: user,
    };
  }
}
