import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private config: ConfigService) {
    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!key) throw new Error('STRIPE_SECRET_KEY manquante');

    this.stripe = new Stripe(key, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'eur',
    });
  }
}