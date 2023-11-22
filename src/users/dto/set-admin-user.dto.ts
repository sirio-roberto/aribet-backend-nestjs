import { IsBoolean, IsOptional } from 'class-validator';

export class SetAdminUserDto {
  @IsBoolean()
  @IsOptional()
  admin?: boolean;
}
