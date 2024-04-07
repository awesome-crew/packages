import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { AdminAuthService } from './admin-auth.service';

/**
 * 어드민 권한이 있는지 확인합니다.
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AdminAuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    (request as any).user = this._getPayload(request);

    return true;
  }

  private _getPayload(req: Request) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('인증정보가 없습니다.');
    }

    try {
      return this.authService.verifyToekn(token);
    } catch {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }
  }
}
