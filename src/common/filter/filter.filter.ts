import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let code = 500;
    let message = 'Internal server error';

    console.log(exception);

    if (exception.response) {
      code = exception.response.statusCode || exception.status;
      message = exception.response.message || exception.message;
    } else if (exception.status) {
      code = exception.status;
      message = exception.message;
    }

    response.status(code).json({
      code: code,
      message: message,
    });
  }
}
