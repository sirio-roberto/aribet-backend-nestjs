import { MaxLength, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
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

  @IsString()
  @IsNotEmpty()
  chavePix?: string;
}
