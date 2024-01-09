import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';

@Module({imports:[
    StripeModule.forRoot({
      apiKey: "sk_test_51OU2dwSEfonuWSsV3rj8djONcCZcpJZRPtpUBsyRfSDoJVJwowTACijIqt2o2rLRYaDJzPxhUdEtGFzOFsqFdK1500aDTVyrIZ",
      apiVersion: '2020-08-27'
    }),],
    providers:[StripeService],
    controllers :[StripeController]
})
export class StripemoduleModule {}
