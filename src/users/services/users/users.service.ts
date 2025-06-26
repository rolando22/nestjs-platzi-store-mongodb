import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(data);
    const savedUser = await newUser.save();
    return savedUser.toObject();
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return deletedUser;
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
