import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateBetDto {
  @IsDateString()
  @IsNotEmpty()
  time: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;
}
