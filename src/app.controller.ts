import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller("/hello")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/test")
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }
  
  @Post("/test")
  postHello(@Req() req: Request): string {
    return this.appService.postHello(req);
  }

  @Post("/pushTest")
  pushTest(@Req() req: Request): Promise<string> {
    return this.appService.pushTest(req);
  }
  
}
