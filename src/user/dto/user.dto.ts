import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  identificator: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
