import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { logger } from './utils/logger/logger';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),AuthModule],
  controllers: [AppController],
  providers: [AppService,Logger],
})

// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // '*'는 모든 라우트에 미들웨어를 적용하는 것을 의미합니다.
  }
}

