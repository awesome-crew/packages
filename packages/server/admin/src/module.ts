import { loadEnv } from '@awesome-dev/server-env';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { AdminAuthController, AdminCommonController } from './controllers';
import { AdminAuthService, AdminGuard } from './providers';

import { AdminConfig } from './config';

@Module({})
export class AwesomeAdminModule {
  static forRoot(): DynamicModule {
    const config = loadEnv([
      'ADMIN_USER_ID',
      'ADMIN_USER_PASSWORD',
      'ADMIN_JWT_SECRET_KEY',
    ] as const);

    const ConfigProvider: Provider = {
      provide: AdminConfig,
      useFactory: () =>
        new AdminConfig({
          userId: config.ADMIN_USER_ID,
          userPassword: config.ADMIN_USER_PASSWORD,
          jwtSecretKey: config.ADMIN_JWT_SECRET_KEY,
        }),
    };

    return {
      module: AwesomeAdminModule,
      controllers: [AdminAuthController, AdminCommonController],
      providers: [ConfigProvider, AdminAuthService, AdminGuard],
    };
  }
}
