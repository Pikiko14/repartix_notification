import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotiticationDto {
  @IsOptional()
  data: any;
  
  @IsNotEmpty()
  @IsIn(['email', 'whatsapp'])
  channel: string;

  @IsNotEmpty()
  @IsIn(['welcome'])
  type_notification: string;

  @IsNotEmpty()
  destinatary: string;
}
