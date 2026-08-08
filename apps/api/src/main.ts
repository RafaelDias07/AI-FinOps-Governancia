import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.setGlobalPrefix('v1');
  app.enableCors({ origin: config.getOrThrow<string>('WEB_ORIGIN'), credentials: true });
  app.enableShutdownHooks();

  await app.listen(config.getOrThrow<number>('PORT'));
}

void bootstrap();
