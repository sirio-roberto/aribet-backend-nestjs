import { IsNotEmpty, MaxLength, IsString, IsOptional } from 'class-validator';

export class UpdateBetDto {
  @IsNotEmpty()
  time: string | Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;
}
