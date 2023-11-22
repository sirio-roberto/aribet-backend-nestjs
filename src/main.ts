import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaKnownErrorsFilter } from './exception-filters/prisma.exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(new PrismaKnownErrorsFilter());

  await app.listen(3000);
}
bootstrap();
