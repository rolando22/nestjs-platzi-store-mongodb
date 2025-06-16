import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

export class OrderItemQueryDto extends PaginationDto {}
