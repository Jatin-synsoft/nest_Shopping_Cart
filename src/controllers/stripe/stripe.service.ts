import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
@Injectable()
export class StripeService {

  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe("sk_test_51OU2dwSEfonuWSsV3rj8djONcCZcpJZRPtpUBsyRfSDoJVJwowTACijIqt2o2rLRYaDJzPxhUdEtGFzOFsqFdK1500aDTVyrIZ", {
      apiVersion: '2020-08-27',
    })

  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email
    });
  }

  async createPaymentIntent(amount: number, currency: string, customerId: string, paymentMethodId: string): Promise<Stripe.PaymentIntent> {
    try {
      
      return await this.stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method: paymentMethodId,
      });
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
      throw error;
    }
  }
}

