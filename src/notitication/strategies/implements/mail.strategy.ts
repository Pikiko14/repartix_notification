import { NotificationFactoryInterface } from 'src/notitication/interfaces/notification.interface';

export class MailStrategy implements NotificationFactoryInterface {
  sendNotification(payload: any): Promise<void> {
    return payload;
  }
}
