import { Injectable } from '@nestjs/common';

import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

interface IMailSenderSendVerifyEmail {
  mailOption: EmailOptions;
}

@Injectable()
export class MailSender {
  private sender: Mail;

  constructor(private readonly configService: ConfigService) {
    this.sender = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  async send({ mailOption }: IMailSenderSendVerifyEmail) {
    return await this.sender.sendMail(mailOption);
  }
}
