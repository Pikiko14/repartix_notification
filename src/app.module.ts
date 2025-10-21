import { envs } from './configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotiticationModule } from './notitication/notitication.module';
import { InternalNotificationsModule } from './internal-notifications/internal-notifications.module';

@Module({
  imports: [
    NotiticationModule,
    InternalNotificationsModule,
    MongooseModule.forRoot(envs.mongo_url),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
