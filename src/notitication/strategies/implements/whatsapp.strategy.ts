import { NotificationFactoryInterface } from 'src/notitication/interfaces/notification.interface';

export class WhastappStrategy implements NotificationFactoryInterface {
  sendNotification(payload: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
