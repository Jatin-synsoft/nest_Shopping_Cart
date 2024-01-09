import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
// import { ImageValidatorMiddleware } from 'src/middlewares/imageValidator.middleware';


@Module({
  controllers: [FileuploadController],

})
export class FileuploadModule{}
// implements NestModule  {
// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(ImageValidatorMiddleware).forRoutes('file')
// }
// }