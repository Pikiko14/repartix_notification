import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateInternalNotificationDto } from './dto/create-internal-notification.dto';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { MarkAsReadDto } from './dto/mark-as-read.dto';
import { InternalNotificationRepository } from './repository/internal-notification.repository';
import { envs } from 'src/configuration';

@Injectable()
export class InternalNotificationsService {
  private readonly logger = new Logger(InternalNotificationsService.name);

  constructor(
    private readonly repository: InternalNotificationRepository,
    @Inject(envs.nats_service_name) private readonly client: ClientProxy,
  ) {}

  async create(createDto: CreateInternalNotificationDto) {
    try {
      // Guardar en MongoDB
      const notification = await this.repository.create(createDto);

      this.logger.log(`Notification created: ${notification._id} for parent: ${createDto.parent_id}`);

      // Emitir evento para WebSocket en tiempo real
      this.client.emit('create-websocket-notification', {
        room: createDto.room || '',
        ...notification.toObject(),
      });

      return {
        success: true,
        notification,
        message: 'Internal notification created successfully',
      };
    } catch (error) {
      this.logger.error(`Error creating notification: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }

  async findByParentId(getDto: GetNotificationsDto) {
    try {
      const page = Number(getDto.page) || 1;
      const limit = Number(getDto.limit) || 20;
      const unreadOnly = getDto.unread_only || false;

      const { notifications, total } = await this.repository.findByParentId(
        getDto.parent_id,
        unreadOnly,
        page,
        limit,
      );

      return {
        success: true,
        notifications,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        message: 'Notifications retrieved successfully',
      };
    } catch (error) {
      this.logger.error(`Error retrieving notifications: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }

  async markAsRead(markAsReadDto: MarkAsReadDto) {
    try {
      const notification = await this.repository.markAsRead(
        markAsReadDto.notification_id,
        markAsReadDto.parent_id,
      );

      if (!notification) {
        throw new RpcException({
          message: 'Notification not found',
          status: 404,
        });
      }

      return {
        success: true,
        notification,
        message: 'Notification marked as read',
      };
    } catch (error) {
      this.logger.error(`Error marking notification as read: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }

  async markAllAsRead(parent_id: string) {
    try {
      const count = await this.repository.markAllAsRead(parent_id);

      return {
        success: true,
        count,
        message: `${count} notifications marked as read`,
      };
    } catch (error) {
      this.logger.error(`Error marking all notifications as read: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }

  async countUnread(parent_id: string) {
    try {
      const count = await this.repository.countUnread(parent_id);

      return {
        success: true,
        count,
        message: 'Unread count retrieved successfully',
      };
    } catch (error) {
      this.logger.error(`Error counting unread notifications: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }

  async delete(notification_id: string, parent_id: string) {
    try {
      const deleted = await this.repository.deleteById(notification_id, parent_id);

      if (!deleted) {
        throw new RpcException({
          message: 'Notification not found',
          status: 404,
        });
      }

      return {
        success: true,
        message: 'Notification deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting notification: ${error.message}`);
      throw new RpcException({
        message: error.message,
        status: 400,
      });
    }
  }
}

