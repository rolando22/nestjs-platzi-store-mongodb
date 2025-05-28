import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CustomersService } from 'src/users/services/customers/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  getAll() {
    const customers = this.customersService.findAll();

    return {
      data: customers,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  getOne(@Param('id') id: string) {
    const customer = this.customersService.findOne(id);

    return {
      data: customer,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() body: CreateCustomerDto) {
    const newCustomer = this.customersService.create(body);

    return {
      message: 'Customer created successfully',
      data: newCustomer,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  update(@Param('id') id: string, @Body() body: UpdateCustomerDto) {
    const customer = this.customersService.update(id, body);

    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  delete(@Param('id') id: string) {
    const customer = this.customersService.delete(id);

    return {
      message: 'Customer deleted successfully',
      data: customer,
    };
  }
}
