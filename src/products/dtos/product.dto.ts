import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  @IsArray()
  @IsNotEmpty()
  readonly categories: string[];
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categories']),
) {}

export class ProductQueryDto extends PaginationDto {
  @ValidateIf((obj: ProductQueryDto) => obj.maxPrice !== undefined)
  @IsPositive()
  minPrice: number;

  @IsOptional()
  @IsPositive()
  maxPrice: number;
}
