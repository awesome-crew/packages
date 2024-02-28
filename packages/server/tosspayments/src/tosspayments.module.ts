import { loadEnv } from '@awesome-dev/server-env';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { TosspaymentsService } from './tosspayments.service';
import { TosspaymentsClient } from './tosspayments.client';

@Module({})
export class TosspaymentsModule {
  static forRoot(): DynamicModule {
    const config = loadEnv(['TOSSPAYMENTS_SECRET_KEY'] as const);

    const ConfigProvider: Provider = {
      provide: TosspaymentsClient,
      useFactory: () => new TosspaymentsClient(config.TOSSPAYMENTS_SECRET_KEY),
    };

    return {
      module: TosspaymentsModule,
      providers: [ConfigProvider, TosspaymentsService],
      exports: [ConfigProvider, TosspaymentsService],
    };
  }
}
