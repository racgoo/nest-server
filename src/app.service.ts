import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {

  getHello(req: Request): string {
    return 'Hello World!';
  }

  postHello(req: Request): string {
    console.log(req.body);
    return 'Hello World!';
  }
  
}
