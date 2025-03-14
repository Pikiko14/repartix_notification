import { Injectable } from '@nestjs/common';
import { CreateNotiticationDto } from './dto/create-notitication.dto';

@Injectable()
export class NotiticationService {
  create(createNotiticationDto: CreateNotiticationDto) {
    console.log(createNotiticationDto);
    return 'This action adds a new notitication';
  }
}
