import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class HttpExceptionFilter
  implements ExceptionFilter<InternalServerErrorException>
{
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(500).json({
      exception,
    });
  }
}
