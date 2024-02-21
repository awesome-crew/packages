import { Injectable } from '@nestjs/common';

import { MessagemeConfig } from './config';
import { SmsClient, SmsSendParams } from './clients';

@Injectable()
export class MessagemeService {
  private readonly smsClient: SmsClient;

  constructor(private readonly config: MessagemeConfig) {
    this.smsClient = new SmsClient(this.config.option);
  }

  sendSms(params: SmsSendParams) {
    return this.smsClient.send(params);
  }
}
