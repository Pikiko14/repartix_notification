import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotiticationDto {
  @IsOptional()
  data: any;
  
  @IsString()
  @IsNotEmpty()
  @IsIn(['email', 'whatsapp'])
  channel: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['welcome'])
  type_notification: string;

  @IsString()
  @IsNotEmpty()
  destinatary: string;
}
