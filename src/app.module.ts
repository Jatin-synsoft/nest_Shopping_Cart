import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './controllers/admin/admin.module';
import { StripemoduleModule } from './controllers/stripe/stripemodule.module';
import { StudentModule } from './controllers/student/student.module';
import { FileuploadModule } from './controllers/fileupload/fileupload.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/cart'), UserModule, AdminModule, StripemoduleModule, StudentModule, FileuploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

 }


