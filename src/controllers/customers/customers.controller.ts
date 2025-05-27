import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CustomersService } from 'src/services/customers/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    const customers = this.customersService.findAll();

    return {
      data: customers,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const customer = this.customersService.findOne(id);

    return {
      data: customer,
    };
  }

  @Post()
  create(@Body() body: CreateCustomerDto) {
    const newCustomer = this.customersService.create(body);

    return {
      message: 'Customer created successfully',
      data: newCustomer,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCustomerDto) {
    const customer = this.customersService.update(id, body);

    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const customer = this.customersService.delete(id);

    return {
      message: 'Customer deleted successfully',
      data: customer,
    };
  }
}
