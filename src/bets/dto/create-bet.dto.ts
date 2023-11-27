import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBetDto {
  @IsNotEmpty()
  @IsString()
  time: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  resultId: number;
}
