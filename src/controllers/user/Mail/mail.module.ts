// import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { join } from 'path';

// @Module({
//   imports: [
//     MailerModule.forRoot({
//       // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
//       // or
//       transport: {
//         host: 'smtp.example.com',
//         secure: false,
//         auth: {
//           user: 'caman7662@gmail.com',
//           pass: 'kegk bgwl lbjg qhht',
//         },
//       },
//       defaults: {
//         from: '"No Reply" <noreply@example.com>',
//       }
//     }),
//   ],
//   providers: [MailService],
//   exports: [MailService],
// })
// export class MailModule {}


// // ,
// //       template: {
// //         dir: join(__dirname, 'templates'),
// //         adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
// //         options: {
// //           strict: true,
// //         },
// //       },