import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@Injectable()
export class CustomersService {
  private counterId = 2;
  private customers: Customer[] = [
    {
      id: '1',
      name: 'Customer 1',
      lastName: 'Last Name 1',
      phone: '1234567890',
    },
    {
      id: '2',
      name: 'Customer 2',
      lastName: 'Last Name 2',
      phone: '0987654321',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: string) {
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer) throw new NotFoundException(`Customer #${id} not found`);

    return customer;
  }

  create(data: CreateCustomerDto) {
    this.counterId++;

    const newCustomer: Customer = {
      id: this.counterId.toString(),
      ...data,
    };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: string, changes: UpdateCustomerDto) {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) throw new NotFoundException(`Customer #${id} not found`);

    this.customers[index] = {
      ...this.customers[index],
      ...changes,
    };

    return this.customers[index];
  }

  delete(id: string) {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) throw new NotFoundException(`Customer #${id} not found`);

    const deletedCustomer = this.customers[index];
    this.customers.splice(index, 1);

    return deletedCustomer;
  }
}
