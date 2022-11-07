import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger = createLogger({
    level: this.configService.get('LOGGER_SERVICE_CONSOLE_TRANSPORT_LEVEL'),
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
    },
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp({
            format: 'DD/MMM/YYYY, hh:mm:ss A',
          }),
          format.printf(({ timestamp, level, context, message, stack }) => {
            const colorize = {
              error: (text: string) => `\x1B[31m${text}\x1B[39m`,
              warn: (text: string) => `\x1B[33m${text}\x1B[39m`,
              info: (text: string) => `\x1B[32m${text}\x1B[39m`,
              verbose: (text: string) => `\x1B[96m${text}\x1B[39m`,
              debug: (text: string) => `\x1B[95m${text}\x1B[39m`,
            }[level];

            const formattedPid = colorize(`[Venflare Server] ${process.pid} -`);
            const formattedLevel = colorize(
              level.toUpperCase().padStart(7, ' '),
            );
            const formattedContext = context ? `[${context}] ` : '';
            const formattedMessage =
              typeof message === 'string'
                ? colorize(message)
                : colorize(JSON.stringify(message, null, 2));
            const formattedStack = stack ? `\n${stack}` : '';

            return `${formattedPid} ${timestamp} ${formattedLevel} ${formattedContext}${formattedMessage}${formattedStack}`;
          }),
        ),
      }),
      new transports.File({
        level: this.configService.get('LOGGER_SERVICE_FILE_TRANSPORT_LEVEL'),
        filename: '.log.local',
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });

  constructor(private readonly configService: ConfigService) {}

  public log(message: any, context?: string) {
    return this.logger.info(message, { context });
  }

  public error(message: any, stack?: string, context?: string) {
    return this.logger.error(message, { stack, context });
  }

  public warn(message: any, context?: string) {
    return this.logger.warn(message, { context });
  }

  public debug?(message: any, stack?: string, context?: string) {
    return this.logger.debug(message, { stack, context });
  }

  public verbose?(message: any, context?: string) {
    return this.logger.verbose(message, { context });
  }
}
