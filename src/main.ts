
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import generateDynamoClient from './utils/database/generateDynamoClient';
import initGlobalVariables from './utils/init/initGlobalVariables';
import { AppModule } from './app.module';
import { logger } from './utils/logger/logger';
import { Request, Response } from 'express';

const Redis = require('ioredis');
const redisAdapter = require('socket.io-redis');

async function bootstrap() {
  // io.adapter(redisAdapter({ pubClient, subClient }));

  initGlobalVariables();

  const app = await NestFactory.create(AppModule,{
    logger: logger
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      transformOptions: {
        enableImplicitConversion: false
      }
    })
  );

  await app.listen(4000);
  
}
bootstrap();
