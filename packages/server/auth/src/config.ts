import { Injectable, ModuleMetadata } from '@nestjs/common';

export interface AuthConfigOption {
  jwt: {
    accessSecretKey: string;
    accessExpiresIn: string;
    refreshSecretKey: string;
    refreshExpiresIn: string;
  };
}

@Injectable()
export class AuthConfig {
  public constructor(private readonly option: AuthConfigOption) {}

  get jwtOption() {
    return this.option.jwt;
  }
}

export interface AuthAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => AuthConfig | Promise<AuthConfig>;
  inject?: any[];
}
