import { Module } from '@nestjs/common';
import { NotiticationService } from './notitication.service';
import { NotiticationController } from './notitication.controller';

@Module({
  controllers: [NotiticationController],
  providers: [NotiticationService],
})
export class NotiticationModule {}
