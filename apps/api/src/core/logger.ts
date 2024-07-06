import * as winston from 'winston';
import * as process from 'process';
import { ClsService } from 'nestjs-cls';

const { createLogger, transports } = winston;
const { combine, timestamp, colorize, printf } = winston.format;

export default class Logger {
  private logger: winston.Logger;
  private is_production = process.env.NODE_ENV === 'production';
  private clsService: ClsService;

  constructor(private readonly subject: string, clsService: ClsService) {
    this.clsService = clsService;

    this.logger = createLogger({
      level: this.is_production ? 'info' : 'silly',
    });

    this.logger.add(
      new transports.Console({
        format: combine(
          colorize(),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          printf((info) => {
            const requestId = this.clsService.get('requestId') || 'unknown';

            return this.is_production
              ? `[${info.timestamp}] [${process.env.NODE_ENV}] [${info.level}] [${this.subject}] [${requestId}] : ${info.message}`
              : `[${info.timestamp}] [${info.level}] [${this.subject}] [${requestId}] : ${info.message}`;
          }),
        ),
      }),
    );
  }

  public debug(debugMsg: string, metadata = '') {
    this.logger.debug(debugMsg + '-' + metadata);
  }

  public info(msg: string, metadata = '') {
    this.logger.info(msg + ' - ' + metadata);
  }

  public error(errMsg: Error | string, metadata = '') {
    if (errMsg instanceof Error) {
      const err = errMsg.stack ? errMsg.stack : errMsg.message;
      this.logger.error(
        err + '\n======================================\nmetadata: ' + metadata,
      );
    } else {
      this.logger.error(
        errMsg +
          '\n======================================\nmetadata: ' +
          metadata,
      );
    }
  }

  public warn(warnMsg: string, metadata = '') {
    this.logger.warn(warnMsg + ' - ' + metadata);
  }
}
