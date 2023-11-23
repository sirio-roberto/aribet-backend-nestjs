import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBetDto {
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  resultId?: number;
}
