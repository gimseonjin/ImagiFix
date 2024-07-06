// http-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';
import Logger from '../../core/logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger: Logger;

  constructor(private clsService: ClsService) {
    this.logger = new Logger('HTTP', clsService);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = uuidv4();
    const store = { requestId };

    this.clsService.runWith(store, () => {
      this.clsService.set('requestId', store.requestId);
      const { ip, method, originalUrl } = request;
      const userAgent = request.get('user-agent') || ''; // header에서 가져옴

      // 요청이 들어왔을 때
      this.logger.info(
        `Request: ${method} ${originalUrl} - ${userAgent} ${ip}`,
      );

      // 응답이 끝났을 때
      response.on('finish', () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        this.logger.info(
          `Response: ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      });

      next();
    });
  }
}
