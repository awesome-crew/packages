import { TosspaymentsClient } from '@awesome-dev/tosspayments';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TosspaymentsService {
  constructor(private readonly client: TosspaymentsClient) {}

  /** 결제 승인 */
  confirm(...args: Parameters<TosspaymentsClient['confirm']>) {
    return this.client.confirm(...args);
  }

  /** 결제 취소 */
  cancel(...args: Parameters<TosspaymentsClient['cancel']>) {
    return this.client.cancel(...args);
  }

  /** 결제 조회 (paymentKey) */
  getByPaymentKey(...args: Parameters<TosspaymentsClient['getByPaymentKey']>) {
    return this.client.getByPaymentKey(...args);
  }

  /** 결제 조회 (orderId) */
  getByOrderId(...args: Parameters<TosspaymentsClient['getByOrderId']>) {
    return this.client.getByOrderId(...args);
  }
}
