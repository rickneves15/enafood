import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class ProductCartDto {
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  value: number;

  @IsNotEmpty()
  quantity: number;
}

export class AddProductCartDto {
  @IsString()
  @ValidateIf((o) => o.cartId != undefined)
  @IsNotEmpty()
  userId: any;

  @IsOptional()
  cartId: string;

  @IsNotEmpty()
  product: ProductCartDto;
}

export class RemoveProductCartDto {
  @IsNotEmpty()
  productId: any;
}

export class ChooseQuantityProductCartDto {
  @IsNotEmpty()
  productId: any;

  @IsNotEmpty()
  quantity: number;
}

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  userId: any;

  @IsOptional()
  @IsArray()
  @Type(() => ProductCartDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  products: ProductCartDto[];

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  amount: number;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
