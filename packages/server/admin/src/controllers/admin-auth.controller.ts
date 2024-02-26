import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { AdminAuthService } from '../providers';

@Controller('/admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('/signin')
  signIn(@Body() body: { code: string; password: string }): string {
    return this.authService.signin(body.code, body.password);
  }

  @Get('/verify')
  verify(@Req() req: Request) {
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
