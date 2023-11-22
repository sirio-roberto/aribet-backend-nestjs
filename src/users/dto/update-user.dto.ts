import {
  MaxLength,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(255)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(255)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsOptional()
  chavePix?: string;
}
