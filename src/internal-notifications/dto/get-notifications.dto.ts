import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetNotificationsDto {
  @IsString()
  parent_id: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  unread_only?: boolean;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

