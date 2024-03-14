import { encodeBase64 } from '@awesome-dev/utils';
import axios from 'axios';

import type { Cancel, Payment } from './types';

interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: `/v${string}`;
  data?: BasePayload;
}

interface BasePayload {
  idempotencyKey?: string;
}

export interface ConfirmPayload extends BasePayload {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface CancelPayload extends BasePayload, Pick<Cancel, 'cancelReason' | 'cancelAmount'> {
  paymentKey: string;

  /** 가상계좌에서만 입력 */
  refundReceiveAccount?: {
    bank: string;
    accountNumber: string;
    holderName: string;
  };
}

export class TosspaymentsClient {
  private baseUrl = 'https://api.tosspayments.com';
  private header: Record<string, string>;

  constructor(private readonly secretKey: string) {
    this.header = {
      'Accept-Language': 'en-US',
      Authorization: `Basic ${encodeBase64(this.secretKey + ':')}`,
    };
  }

  private request<Response>(option: RequestOption) {
    const { data } = option;

    return axios.request<Response>({
      url: `${this.baseUrl}${option.path}`,
      method: option.method,
      data,
      headers: {
        ...this.header,
        ...(data?.idempotencyKey != null ? { 'Idempotency-Key': data.idempotencyKey } : {}),
      },
    });
  }

  confirm(payload: ConfirmPayload) {
    return this.request<Payment>({
      method: 'POST',
      path: `/v1/payments/confirm`,
      data: { ...payload },
    });
  }

  cancel({ paymentKey, ...payload }: CancelPayload) {
    return this.request<Payment>({
      method: 'POST',
      path: `/v1/payments/${paymentKey}/cancel`,
      data: { ...payload },
    });
  }

  getByPaymentKey(paymentKey: string) {
    return this.request<Payment>({
      method: 'GET',
      path: `/v1/payments/${paymentKey}`,
    });
  }

  getByOrderId(orderId: string) {
    return this.request<Payment>({
      method: 'GET',
      path: `/v1/payments/orders/${orderId}`,
    });
  }
}
