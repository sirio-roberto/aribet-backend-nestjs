import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaKnownErrorsFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log(exception);

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const errorMessage = exception.meta?.cause ?? exception.message;

    if (exception.code === 'P2025') {
      response.status(404).json({
        statusCode: 404,
        message: errorMessage,
      });
    } else if (exception.code === 'P2002') {
      const notUniqueFieldsMessage = exception.meta?.target
        ? { 'duplicate fields': exception.meta?.target }
        : exception.message;
      response.status(400).json({
        statusCode: 400,
        message: notUniqueFieldsMessage,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Unknown error',
      });
    }
  }
}
