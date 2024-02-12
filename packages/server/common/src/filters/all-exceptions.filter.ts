import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { BaseException } from '../exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (exception instanceof BaseException) {
      console.log('handled-base::', exception);
    } else if (exception instanceof NotFoundException) {
      exception = new BaseException({
        code: 'ENDPOINT_NOT_FOUND',
        message: exception.message,
        status: HttpStatus.NOT_FOUND,
      });
    } else {
      console.log('unhandled::', exception);
      exception = new InternalServerErrorException(exception);
    }

    const response = (exception as HttpException).getResponse();

    httpAdapter.reply(
      ctx.getResponse(),
      {
        code: 'UNKNOWN',
        message: '알 수 없는 에러가 발생했습니다.',
        ...(response as object),
        timestamp: new Date(),
        url: req.url,
      },
      (exception as HttpException).getStatus()
    );
  }
}
