import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();

    if (!customer) throw new NotFoundException(`Customer #${id} not found`);

    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(data);
    const savedCustomer = await newCustomer.save();
    return savedCustomer.toObject();
  }

  async update(id: string, changes: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return updatedCustomer;
  }

  async delete(id: string): Promise<Customer> {
    const deletedCustomer = await this.customerModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedCustomer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return deletedCustomer;
  }
}
