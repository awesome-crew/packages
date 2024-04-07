import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { AdminConfig } from '../config';

/**
 * 어드민 로그인 서비스
 */
@Injectable()
export class AdminAuthService {
  constructor(private readonly config: AdminConfig) {}

  /**
   * 로그인을 수행합니다.
   * env에 설정된 userId와 userPassword를 비교하여 일치하면 토큰을 발급합니다.
   */
  signin(code: string, password: string) {
    if (
      code !== this.config.getOption('userId') ||
      password !== this.config.getOption('userPassword')
    ) {
      throw new UnauthorizedException('');
    }

    return this.createToken();
  }

  createToken() {
    return jwt.sign({ sub: 1 }, this.config.getOption('jwtSecretKey'), {
      expiresIn: '31d',
    });
  }

  verifyToekn(token: string) {
    return jwt.verify(token, this.config.getOption('jwtSecretKey')) as jwt.JwtPayload;
  }
}
