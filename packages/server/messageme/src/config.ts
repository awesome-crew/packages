import { Injectable, ModuleMetadata } from '@nestjs/common';

export interface MessagemeConfigOption {
  apiKey: string;
  sms: {
    callingNumber: string;
    useCallBlock?: boolean;
  };
}

@Injectable()
export class MessagemeConfig {
  public constructor(readonly option: MessagemeConfigOption) {}
}

export interface MessagemeAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => MessagemeConfig | Promise<MessagemeConfig>;
  inject?: any[];
}
