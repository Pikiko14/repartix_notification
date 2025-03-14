import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotiticationService } from './notitication.service';
import { CreateNotiticationDto } from './dto/create-notitication.dto';

@Controller()
export class NotiticationController {
  constructor(private readonly notiticationService: NotiticationService) {}

  @MessagePattern('createNotitication')
  create(@Payload() createNotiticationDto: CreateNotiticationDto) {
    return this.notiticationService.create(createNotiticationDto);
  }
}
