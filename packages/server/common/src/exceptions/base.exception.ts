import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * BaseException을 상속받아 예외를 정의할 수 있습니다.
 */
export class BaseException extends HttpException {
  constructor(params: { code: string; message: string; status: HttpStatus }) {
    const { code, message, status } = params;
    super({ code, message }, status);
  }
}
