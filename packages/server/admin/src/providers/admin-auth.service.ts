import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { AdminConfig } from '../config';

@Injectable()
export class AdminAuthService {
  constructor(private readonly config: AdminConfig) {}

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
