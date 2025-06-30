import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsPositive } from 'class-validator';

import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CreateOrderItemDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly product: string;

  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

export class OrderItemQueryDto extends PaginationDto {}
