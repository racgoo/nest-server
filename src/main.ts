

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import generateDynamoClient from './utils/database/generateDynamoClient';
import initGlobalVariables from './utils/init/initGlobalVariables';
import { AppModule } from './app.module';
import { logger } from './utils/logger/logger';
import { Request, Response } from 'express';
import * as moment from "moment";
import updateSpecialDayAction from './action/updateSpecialDayAction';
const Redis = require('ioredis');
const redisAdapter = require('socket.io-redis');

async function bootstrap() {
  // io.adapter(redisAdapter({ pubClient, subClient }));
  initGlobalVariables();
  
  // const app = await NestFactory.create<NestFastifyApplication>(
  const app = await NestFactory.create(
    AppModule,
    // new FastifyAdapter(),
    {
      logger: logger,
    }
  );

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
