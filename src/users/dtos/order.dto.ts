import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class OrderQueryDto extends PaginationDto {}
