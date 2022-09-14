/*
 *
 * Primary file for the bootstrap logic.
 *
 */

// ! Dependencies.
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! Ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(
    new ValidationPipe({
      // ! Sanitize request body.
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
