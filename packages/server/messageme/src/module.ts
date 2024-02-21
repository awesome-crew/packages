import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { MessagemeAsyncConfig, MessagemeConfig } from './config';
import { MessagemeService } from './service';

@Global()
@Module({})
export class MessagemeModule {
  public static forRootAsync(asyncConfig: MessagemeAsyncConfig): DynamicModule {
    const ConfigProvider: Provider = {
      provide: MessagemeConfig,
      useFactory: asyncConfig.useFactory,
      inject: asyncConfig.inject || [],
    };

    return {
      global: true,
      module: MessagemeModule,
      imports: asyncConfig.imports ?? [],
      providers: [MessagemeService, ConfigProvider],
      exports: [MessagemeService, ConfigProvider],
    };
  }
}
