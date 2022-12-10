import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, ip, path: url } = req;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const res: Response = context.switchToHttp().getResponse();
        const contentLength = res.get('content-length') || 0;
        const delay = Date.now() - now;

        this.logger.log(
          `${method} ${url} ${res.statusCode} - ${contentLength} ${ip} +${delay}ms`,
        );
      }),
    );
  }
}
