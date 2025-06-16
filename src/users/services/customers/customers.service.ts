import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDto,
  CustomerQueryDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(filters?: CustomerQueryDto): Promise<Customer[]> {
    const { limit, offset } = filters!;

    const customers = await this.customersRepository.find({
      take: limit,
      skip: offset,
    });
    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { id },
    });

    if (!customer) throw new NotFoundException(`Customer #${id} not found`);

    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customersRepository.create(data);
    const savedCustomer = await this.customersRepository.save(newCustomer);
    return savedCustomer;
  }

  async update(id: number, changes: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    this.customersRepository.merge(customer, changes);
    const updatedCustomer = this.customersRepository.save(customer);
    return updatedCustomer;
  }

  async delete(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    await this.customersRepository.delete(customer.id);
    return customer;
  }
}
