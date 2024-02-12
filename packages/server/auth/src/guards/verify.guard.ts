import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { TokenNotProvidedException } from '../exceptions';
import { AuthService } from '../auth.service';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new TokenNotProvidedException();
    }

    const payload = this.service.verifyAccessToken(token);
    (request as any).user = payload;
    return true;
  }
}
