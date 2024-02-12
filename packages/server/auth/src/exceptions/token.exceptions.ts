import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@awesome-dev/server-common';

export class TokenNotProvidedException extends BaseException {
  static code = 'TOKEN_NOT_PROVIDED';

  constructor() {
    super({
      code: TokenNotProvidedException.code,
      message: '토큰이 제공되지 않았습니다.',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class InvalidTokenException extends BaseException {
  static code = 'INVALID_TOKEN';

  constructor() {
    super({
      code: InvalidTokenException.code,
      message: '제공된 토큰이 유효하지 않습니다.',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
