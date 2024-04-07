import { Injectable } from '@nestjs/common';

export interface AdminConfigOption {
  userId: string;
  userPassword: string;
  jwtSecretKey: string;
}

/**
 * AdminConfigOption의 key를 이용해 값을 가져옵니다.
 */
@Injectable()
export class AdminConfig {
  public constructor(private readonly option: AdminConfigOption) {}

  getOption(key: keyof AdminConfigOption) {
    return this.option[key];
  }
}
