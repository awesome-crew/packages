import type { ValueOf } from '@awesome-dev/typings';

export const PaymentType = {
  NORMAL: 'NORMAL',
  BILLING: 'BILLING',
  BRANDPAY: 'BRANDPAY',
} as const;
export type PaymentType = ValueOf<typeof PaymentType>;

export const PaymentMethod = {
  CARD: 'CARD',
  EASY_PAY: 'EASY_PAY',
  VIRTUAL_ACCOUNT: 'VIRTUAL_ACCOUNT',
  MOBILE_PHONE: 'MOBILE_PHONE',
  TRANSFER: 'TRANSFER',
  CULTURE_GIFT_CERTIFICATE: 'CULTURE_GIFT_CERTIFICATE',
  BOOK_GIFT_CERTIFICATE: 'BOOK_GIFT_CERTIFICATE',
  GAME_GIFT_CERTIFICATE: 'GAME_GIFT_CERTIFICATE',
};
export type PaymentMethod = ValueOf<typeof PaymentMethod>;

export const PaymentStatus = {
  READY: 'READY',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT: 'WAITING_FOR_DEPOSIT',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
  PARTIAL_CANCELED: 'PARTIAL_CANCELED',
  ABORTED: 'ABORTED',
  EXPIRED: 'EXPIRED',
};
export type PaymentStatus = ValueOf<typeof PaymentStatus>;

export interface Payment {
  version: string;
  paymentKey: string;
  type: PaymentType;

  orderId: string;
  orderName: string;
  mId: string;
  method: PaymentMethod;

  totalAmount: number;
  balanceAmount: number;
  status: PaymentStatus;

  requestedAt: string;
  approvedAt: string;

  lastTransactionKey: string;

  easyPay: EasyPay | null;
}

export interface Cancel {
  cancelAmount: number;
  cancelReason: string;
  refundableAmount: number;
  canceledAt: string;
  transactionKey: string;
  receiptKey?: string;
}

export interface TosspaymentsErrorResponse {
  code: string;
  message: string;
}

export const EasyPayProvider = {
  TOSSPAY: 'TOSSPAY',
  NAVERPAY: 'NAVERPAY',
  SAMSUNGPAY: 'SAMSUNGPAY',
  KAKAOPAY: 'KAKAOPAY',
};
export type EasyPayProvider = ValueOf<typeof EasyPayProvider>;

export interface EasyPay {
  provider: EasyPayProvider;
}
