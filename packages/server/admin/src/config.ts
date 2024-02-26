import { Injectable } from '@nestjs/common';

export interface AdminConfigOption {
  userId: string;
  userPassword: string;
  jwtSecretKey: string;
}

@Injectable()
export class AdminConfig {
  public constructor(private readonly option: AdminConfigOption) {}

  getOption(key: keyof AdminConfigOption) {
    return this.option[key];
  }
}
