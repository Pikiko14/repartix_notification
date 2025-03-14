import { NotificationFactoryInterface } from '../interfaces/notification.interface';
import { MailStrategy } from './implements/mail.strategy';
import { WhastappStrategy } from './implements/whatsapp.strategy';

export class NotificationFactory {
  static createNotificationChannel(channel: string): NotificationFactoryInterface {
    switch (channel) {
      case 'whatsapp':
        return new WhastappStrategy();

      case 'email':
        return new MailStrategy();

      default:
        throw new Error('Pasarela de pago no soportada.');
    }
  }
}
