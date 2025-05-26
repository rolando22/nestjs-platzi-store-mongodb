import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll() {
    return {
      data: [],
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      data: {
        id,
      },
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      message: 'Order created successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: body,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      message: 'Order updated successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        id,
        ...body,
      },
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      message: 'Order deleted successfully',
      data: {
        id,
      },
    };
  }
}
