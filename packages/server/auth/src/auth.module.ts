import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { AuthAsyncConfig, AuthConfig } from './config';
import { AuthService } from './auth.service';

@Global()
@Module({})
export class AuthModule {
  public static forRootAsync(asyncConfig: AuthAsyncConfig): DynamicModule {
    const AuthConfigProvider: Provider = {
      provide: AuthConfig,
      useFactory: asyncConfig.useFactory,
      inject: asyncConfig.inject || [],
    };

    return {
      global: true,
      module: AuthModule,
      imports: asyncConfig.imports ?? [],
      providers: [AuthService, AuthConfigProvider],
      exports: [AuthService, AuthConfigProvider],
    };
  }
}
