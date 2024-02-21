import { MessagemeConfigOption } from '../config';
import { formatPhoneNumber } from '../utils';

import { BaseClient, BaseCommand } from './base.client';

export interface SmsOptions extends Pick<MessagemeConfigOption, 'apiKey' | 'sms'> {}
export interface SmsSendParams {
  title?: string;
  body: string;
  to: string | string[];
  imageUrl?: string;
}

export class SmsSendCommand extends BaseCommand {
  constructor(
    readonly options: SmsOptions,
    readonly params: SmsSendParams
  ) {
    super();
  }

  toPayload() {
    const to = typeof this.params.to === 'string' ? [this.params.to] : this.params.to;

    return {
      callback: formatPhoneNumber(this.options.sms.callingNumber),
      subject: this.params.title,
      msg: this.params.body,
      image: this.params.imageUrl,
      dstaddr: to.map(formatPhoneNumber).join('|'),
    };
  }
}

export class SmsClient extends BaseClient {
  apiPath = '/sms_send';

  constructor(protected readonly options: SmsOptions) {
    super(options.apiKey);
  }

  public async send(params: SmsSendParams) {
    return this.execute(new SmsSendCommand(this.options, params));
  }
}
