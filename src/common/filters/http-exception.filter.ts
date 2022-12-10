import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const response = ctx.getResponse();
    const exceptionResponse = exception.getResponse() as any;
    const status: HttpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resp = {
      status,
      success: false,
      message: exceptionResponse?.message ?? exception.message,
    };

    return response.status(status).json(resp);
  }
}
