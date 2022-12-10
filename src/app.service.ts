import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  healthCheck(res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'ok',
    });
  }
}
