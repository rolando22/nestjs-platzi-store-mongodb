import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateOrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly customer: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  readonly items: CreateOrderItemDto[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['items']),
) {}

export class AddItemToOrderDto {
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class OrderQueryDto extends PaginationDto {}
