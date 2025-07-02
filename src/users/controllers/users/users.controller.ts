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

import { UsersService } from 'src/users/services/users/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
} from 'src/users/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAll(@Query() query: UserQueryDto) {
    const users = await this.usersService.findAll(query);

    return {
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.findOne(id);

    return {
      data: user,
    };
  }

  // @Get(':id/orders')
  // @ApiOperation({ summary: 'Get orders by user' })
  // async getOrders(@Param('id', ParseIntPipe) id: number) {
  //   const orders = await this.usersService.getOrdersByUser(id);
  //   return {
  //     data: orders,
  //   };
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() body: CreateUserDto) {
    const newUser = await this.usersService.create(body);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, body);

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.delete(id);

    return {
      message: 'User deleted successfully',
      data: user,
    };
  }
}
