import {
  ExceptionFilter as NestExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  statusCode: string;
  message: string | string[];
  error?: string;
}

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const exceptionStatus = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as HttpExceptionResponse;
      const exceptionResponseMessage = exceptionResponse.message;
      const formattedExceptionResponseMessage = Array.isArray(
        exceptionResponseMessage,
      )
        ? exceptionResponseMessage.join(', ')
        : exceptionResponseMessage;

      response.status(exceptionStatus).json(exceptionResponse);

      if (exceptionStatus >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          `${request.method} ${request.url} ${exceptionStatus} - ${formattedExceptionResponseMessage}`,
          exception.stack,
        );
      } else {
        this.logger.debug(
          `${request.method} ${request.url} ${exceptionStatus} - ${formattedExceptionResponseMessage}`,
          exception.stack,
        );
      }
    } else if (exception instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });

      this.logger.error(
        `${request.method} ${request.url} ${
          HttpStatus.INTERNAL_SERVER_ERROR
        } - ${exception.message ? exception.message : 'Internal server error'}`,
        exception.stack,
      );
    }
  }
}
