// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';
// // import { User } from './../user/user.entity';

// @Injectable()
// export class MailService {
//   constructor(private mailerService: MailerService) {}

//   async sendUserConfirmation(user, token: string) {
//     const url = `example.com/auth/confirm?token=${token}`;

//     await this.mailerService.sendMail({
//       to: user.email,
//       // from: '"Support Team" <support@example.com>', // override default from
//       subject: 'Welcome to Nice App! Confirm your Email',
//       text: 'confirmation', // `.hbs` extension is appended automatically
//       context: { // ✏️ filling curly brackets with content
//         name: user.name,
//         url,
//       },
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'caman7662@gmail.com',
        pass: 'kegk bgwl lbjg qhht',
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'yashjadhav.synsoft@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      text: `Click the following link to reset your password: http://your-app-url/reset-password?token=${resetToken}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

