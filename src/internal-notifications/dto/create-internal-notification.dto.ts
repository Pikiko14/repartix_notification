import { IsString, IsEnum, IsOptional, IsObject, IsNotEmpty } from 'class-validator';
import { NotificationType, NotificationPriority } from '../entities/internal-notification.entity';

export class CreateInternalNotificationDto {
  @IsString()
  @IsNotEmpty()
  parent_id: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority;

  @IsString()
  @IsOptional()
  room?: string;
}

