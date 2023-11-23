import {
  IsDate,
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateBetDto {
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;
}
