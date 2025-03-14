import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/configuration';
import { CreateNotiticationDto } from 'src/notitication/dto/create-notitication.dto';
import { NotificationFactoryInterface } from 'src/notitication/interfaces/notification.interface';

export class MailStrategy implements NotificationFactoryInterface {
  logger = new Logger();
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.smtp_host,
      port: parseInt(envs.smtp_host),
      secure: envs.smtp_secure,
      auth: {
        user: envs.smtp_user,
        pass: envs.smtp_password,
      },
    });
  }

  async sendNotification(
    payload: CreateNotiticationDto,
  ): Promise<CreateNotiticationDto | void> {
    try {
      const mailOptions = {
        from: `${envs.smtp_user}`,
        to: payload.destinatary,
        subject: payload.type_notification,
        html: '<p>Hola bienvenido</p>',
      };
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Correo enviado ha ${mailOptions.to}, Id message: ${info.messageId}`);
    } catch (error) {
      throw new Error(error);
    }
  }
}
