import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 2;
  private customers: Customer[] = [
    {
      id: '1',
      name: 'Customer 1',
      phone: '1234567890',
      address: '123 Main St, City, Country',
    },
    {
      id: '2',
      name: 'Customer 2',
      phone: '0987654321',
      address: '456 Elm St, City, Country',
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

  create(data: any) {
    this.counterId++;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newCustomer: Customer = {
      id: this.counterId.toString(),
      ...data,
    };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: string, changes: any) {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) throw new NotFoundException(`Customer #${id} not found`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
