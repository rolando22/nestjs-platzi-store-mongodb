import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductsService } from 'src/products/services/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

@Injectable()
export class UsersService {
  private counterId = 2;
  private users: User[] = [
    {
      id: '1',
      email: 'user1@mail.com',
      password: 'password1',
      role: 'admin',
    },
    {
      id: '2',
      email: 'user2@mail.com',
      password: 'password2',
      role: 'customer',
    },
  ];

  constructor(private productsService: ProductsService) {}

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  create(data: CreateUserDto) {
    this.counterId++;

    const newUser: User = {
      id: this.counterId.toString(),
      ...data,
    };
    this.users.push(newUser);

    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException(`User #${id} not found`);

    this.users[index] = {
      ...this.users[index],
      ...changes,
    };

    return this.users[index];
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException(`User #${id} not found`);

    const deletedUser = this.users[index];
    this.users.splice(index, 1);

    return deletedUser;
  }

  getOrdersByUser(userId: string): Order {
    const user = this.findOne(userId);
    const products = this.productsService.findAll();

    return {
      date: new Date(),
      user: user,
      products,
    };
  }
}
