import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { logger } from './utils/logger/logger';
import { APP_FILTER } from '@nestjs/core';
import { ServiceExceptionToHttpExceptionFilter } from './modules/exception/exception';
import { ScheduleModule as SchedulerModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.controller';
import { HealthModule } from './modules/health/health.module';
import { TokenAuthMiddleware } from './middleware/tokenAuth.middleware';
import { CalenderModule } from './modules/calendar/calendar.module';
import { CalendarService } from './modules/calendar/calendar.service';
import { ScheduleService } from './modules/schedule/schedule.service';
import { ScheduleModule } from './modules/schedule/schedule.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HealthModule,
    CalenderModule,
    ScheduleModule,
    SchedulerModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
    CalendarService,
    ScheduleService,
    // Logger,
    {
      provide: APP_FILTER,
      useClass: ServiceExceptionToHttpExceptionFilter,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      // LoggerMiddleware,
      TokenAuthMiddleware
    ).forRoutes('*'); // '*'는 모든 라우트에 미들웨어를 적용하는 것을 의미합니다.
  }
}

