import { CreateNotiticationDto } from "../dto/create-notitication.dto";

export interface NotificationFactoryInterface {
  sendNotification(payload: CreateNotiticationDto): Promise<CreateNotiticationDto | void>;
}
