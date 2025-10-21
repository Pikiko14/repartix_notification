import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InternalNotificationsService } from './internal-notifications.service';
import { InternalNotificationsController } from './internal-notifications.controller';
import { InternalNotification, InternalNotificationSchema } from './entities/internal-notification.entity';
import { InternalNotificationRepository } from './repository/internal-notification.repository';
import { envs } from 'src/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InternalNotification.name,
        schema: InternalNotificationSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: envs.nats_service_name,
        transport: Transport.NATS,
        options: {
          servers: [envs.nats_server],
        },
      },
    ]),
  ],
  controllers: [InternalNotificationsController],
  providers: [InternalNotificationsService, InternalNotificationRepository],
})
export class InternalNotificationsModule {}

