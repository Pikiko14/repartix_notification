import { Module } from '@nestjs/common';
import { NotiticationModule } from './notitication/notitication.module';

@Module({
  imports: [NotiticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
