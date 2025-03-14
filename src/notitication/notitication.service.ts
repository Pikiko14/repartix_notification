import { Injectable, Logger } from '@nestjs/common';
import { CreateNotiticationDto } from './dto/create-notitication.dto';
import { NotificationFactory } from './strategies/notification.factory';

@Injectable()
export class NotiticationService {
  logger = new Logger();

  async create(createNotiticationDto: CreateNotiticationDto) {
    try {
      const channel = NotificationFactory.createNotificationChannel(createNotiticationDto.channel);
      await channel.sendNotification(createNotiticationDto);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
