import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    const users = this.usersService.findAll();

    return {
      data: users,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);

    return {
      data: user,
    };
  }

  @Post()
  create(@Body() body: any) {
    const newUser = this.usersService.create(body);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const user = this.usersService.update(id, body);

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const user = this.usersService.delete(id);

    return {
      message: 'User deleted successfully',
      data: user,
    };
  }
}
