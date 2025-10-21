import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { InternalNotificationsService } from './internal-notifications.service';
import { CreateInternalNotificationDto } from './dto/create-internal-notification.dto';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { MarkAsReadDto } from './dto/mark-as-read.dto';

@Controller()
export class InternalNotificationsController {
  constructor(
    private readonly internalNotificationsService: InternalNotificationsService,
  ) {}

  @EventPattern('create-internal-notification')
  async create(@Payload() createDto: CreateInternalNotificationDto) {
    return await this.internalNotificationsService.create(createDto);
  }

  @MessagePattern('get-internal-notifications')
  async findAll(@Payload() getDto: GetNotificationsDto) {
    return await this.internalNotificationsService.findByParentId(getDto);
  }

  @MessagePattern('mark-notification-as-read')
  async markAsRead(@Payload() markAsReadDto: MarkAsReadDto) {
    return await this.internalNotificationsService.markAsRead(markAsReadDto);
  }

  @MessagePattern('mark-all-notifications-as-read')
  async markAllAsRead(@Payload() data: { parent_id: string }) {
    return await this.internalNotificationsService.markAllAsRead(data.parent_id);
  }

  @MessagePattern('count-unread-notifications')
  async countUnread(@Payload() data: { parent_id: string }) {
    return await this.internalNotificationsService.countUnread(data.parent_id);
  }

  @MessagePattern('delete-notification')
  async delete(@Payload() data: { notification_id: string; parent_id: string }) {
    return await this.internalNotificationsService.delete(
      data.notification_id,
      data.parent_id,
    );
  }
}

