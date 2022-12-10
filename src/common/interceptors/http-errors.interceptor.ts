import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  GoneException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, ip, path: url } = req;
    const now = Date.now();

    return next.handle().pipe(
      catchError((err) => {
        const response: any = err?.response;
        const delay = Date.now() - now;

        this.logger.error(
          `${method} ${url} ${
            response?.statusCode ?? err?.status ?? err?.code
          } - ${ip} +${delay}ms`,
        );

        const message = response?.message ?? err?.message;

        switch (response?.statusCode ?? err?.status ?? err?.code) {
          case HttpStatus.BAD_REQUEST:
            return throwError(() => new BadRequestException(message));
          case HttpStatus.UNAUTHORIZED:
            return throwError(() => new UnauthorizedException(message));
          case HttpStatus.NOT_ACCEPTABLE:
            return throwError(() => new NotAcceptableException(message));
          case HttpStatus.NOT_FOUND:
            return throwError(() => new NotFoundException(message));
          case HttpStatus.GONE:
            return throwError(() => new GoneException(message));
          case HttpStatus.CONFLICT:
            return throwError(() => new ConflictException(message));
          case HttpStatus.FORBIDDEN:
            return throwError(() => new ForbiddenException(message));
          case HttpStatus.INTERNAL_SERVER_ERROR:
            return throwError(() => new InternalServerErrorException(message));
          default:
            return throwError(() => new InternalServerErrorException(message));
        }
      }),
    );
  }
}
