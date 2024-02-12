import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { AuthConfig } from './config';
import { JwtPayload } from './jwt-payload.interface';
import { InvalidTokenException } from './exceptions';

@Injectable()
export class AuthService {
  constructor(private readonly config: AuthConfig) {}

  createToken<T extends JwtPayload>(payload: T) {
    const { accessSecretKey, accessExpiresIn, refreshSecretKey, refreshExpiresIn } =
      this.config.jwtOption;

    return {
      access: jwt.sign(payload, accessSecretKey, { expiresIn: accessExpiresIn }),
      refresh: jwt.sign(payload, refreshSecretKey, { expiresIn: refreshExpiresIn }),
    };
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, this.config.jwtOption.accessSecretKey) as unknown as JwtPayload;
    } catch {
      throw new InvalidTokenException();
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, this.config.jwtOption.refreshSecretKey) as unknown as JwtPayload;
    } catch {
      throw new InvalidTokenException();
    }
  }
}
