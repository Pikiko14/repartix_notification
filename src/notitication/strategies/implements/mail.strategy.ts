import * as path from 'path';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
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

  /**
   * Send mail notification
   * @param payload
   * @return { void }
   */
  async sendNotification(
    payload: CreateNotiticationDto,
  ): Promise<CreateNotiticationDto | void> {
    try {
      // prepare html
      const html = await this.loadMailTemplate(
        payload.type_notification,
        payload.data,
      );

      if (html) {
        // send email
        const mailOptions = {
          from: `${envs.smtp_user}`,
          to: payload.destinatary,
          subject: payload.type_notification,
          html,
        };
        const info = await this.transporter.sendMail(mailOptions);

        // success log
        this.logger.log(
          `Correo enviado ha ${mailOptions.to}, Id message: ${info.messageId}`,
        );
      } else {
        this.logger.error(
          `No se a podido cargar la plantilla correspondiente para: ${payload.type_notification}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Ha ocurrido un error al enviar el correo electrónico: ${error.message}`,
      );
    }
  }

  /**
   * Load template
   * @return { string }
   */
  async loadMailTemplate(typeNotification: string, data: any) {
    try {
      // init html
      let html = ``;
      let mailData = {};

      // get path templates
      const templatePath = path.join(
        __dirname,
        '../../../../src/templates/emails',
      );

      // load welcome template email
      if (typeNotification === 'welcome_notification') {
        html = await fs.readFile(
          `${templatePath}/welcome.template.html`,
          'utf-8',
        );
        mailData = {
          full_name: data?.profile?.full_name,
          username: data?.username,
          password: data?.password_string,
          url_app: envs.app_url,
        };
      }

      // load recovery password template email
      if (typeNotification === 'recovery_password_notification') {
        html = await fs.readFile(
          `${templatePath}/recovery-password.template.html`,
          'utf-8',
        );
        mailData = {
          username: data?.username,
          url_app: envs.app_url,
          recovery_token: data?.recovery_token,
        };
      }

      // load payment success template
      if (typeNotification === 'success_payment_notification') {
        html = await fs.readFile(
          `${templatePath}/payment-success.template.html`,
          'utf-8',
        );
        mailData = {
          username: data?.user?.username,
          subscription_id: data._id,
        };
      }

      // Compile template
      const template = Handlebars.compile(html);
      html = template(mailData);
      return html;
    } catch (error) {
      this.logger.error(
        `Ha ocurrido un error al cargar la plantilla: ${error.message}`,
      );
    }
  }
}
