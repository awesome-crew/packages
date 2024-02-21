import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { S3AsyncConfig, S3Config } from './config';
import { AwsS3Service } from './service';

@Global()
@Module({})
export class AwsS3Module {
  public static forRootAsync(asyncConfig: S3AsyncConfig): DynamicModule {
    const ConfigProvider: Provider = {
      provide: S3Config,
      useFactory: asyncConfig.useFactory,
      inject: asyncConfig.inject || [],
    };

    return {
      global: true,
      module: AwsS3Module,
      imports: asyncConfig.imports ?? [],
      providers: [AwsS3Service, ConfigProvider],
      exports: [AwsS3Service, ConfigProvider],
    };
  }
}
