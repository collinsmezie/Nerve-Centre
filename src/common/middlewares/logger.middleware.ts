import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now(); // Record start time for performance
    const { method, originalUrl } = req;

    this.logger.log(`Request: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      this.logger.log(
        `Response: ${method} ${originalUrl} - Status: ${statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}