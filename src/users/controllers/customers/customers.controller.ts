import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CustomersService } from 'src/users/services/customers/customers.service';
import {
  CreateCustomerDto,
  CustomerQueryDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  async getAll(@Query() query: CustomerQueryDto) {
    const customers = await this.customersService.findAll(query);

    return {
      data: customers,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const customer = await this.customersService.findOne(id);

    return {
      data: customer,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  async create(@Body() body: CreateCustomerDto) {
    const newCustomer = await this.customersService.create(body);

    return {
      message: 'Customer created successfully',
      data: newCustomer,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(id, body);

    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  async delete(@Param('id', MongoIdPipe) id: string) {
    const customer = await this.customersService.delete(id);

    return {
      message: 'Customer deleted successfully',
      data: customer,
    };
  }
}
