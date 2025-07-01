import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
} from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(filters?: UserQueryDto): Promise<User[]> {
    const { limit = 10, offset = 0 } = filters!;

    const users = await this.userModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('customer')
      .exec();

    return users.map((user) => user.toObject());
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('customer').exec();

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user.toObject();
  }

  async findByEmail(email: User['email']): Promise<User> {
    const user = await this.userModel
      .findOne({ email })
      .populate('customer')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with email #${email} not found`);
    }

    return user.toObject();
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(data);

    if (data.customer) {
      const customer = await this.customerModel.findById(data.customer).exec();
      if (!customer) {
        throw new NotFoundException(`Customer #${data.customer} not found`);
      }
      newUser.customer = customer;
    }

    const savedUser = await newUser.save();
    return savedUser.toObject();
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return updatedUser.toObject();
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return deletedUser.toObject();
  }

  // async getOrdersByUser(userId: number): Promise<Order> {
  //   const user = await this.findOne(userId);
  //   const products = await this.productsService.findAll();

  //   return {
  //     date: new Date(),
  //     user: user,
  //     products,
  //   };
  // }
}
