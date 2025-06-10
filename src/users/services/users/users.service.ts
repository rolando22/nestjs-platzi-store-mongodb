import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from 'src/products/services/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(data);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, changes);
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return user;
  }

  async getOrdersByUser(userId: number): Promise<Order> {
    const user = await this.findOne(userId);
    const products = await this.productsService.findAll();

    return {
      date: new Date(),
      user: user,
      products,
    };
  }
}
