import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendTokenEmail(to: string, token: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject: 'Token de confirmación de pago',
      text: `Tu token para confirmar el pago es: ${token}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
