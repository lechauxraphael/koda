import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('intent')
  async createPaymentIntent(@Body() body: { amount: number }) {
    const intent = await this.paymentService.createPaymentIntent(body.amount);
    return { clientSecret: intent.client_secret };
  }
}