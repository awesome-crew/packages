import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { TokenNotProvidedException } from '../exceptions';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtOrNotGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request & {
      user: JwtPayload | null;
    };

    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new TokenNotProvidedException();
      }

      const payload = this.service.verifyAccessToken(token);
      request.user = payload;
    } catch (err) {
      request.user = null;
    }

    return true;
  }
}
