import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exception/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // exception filter setting
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // swagger setting
  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Desc')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(80);
}

bootstrap();
