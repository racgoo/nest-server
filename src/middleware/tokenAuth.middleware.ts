import {
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import verifyToken from 'src/utils/jwt/verifyToken';
  
  @Injectable()
  export class TokenAuthMiddleware implements NestMiddleware {
    constructor() {}
    use(req: Request, res: Response, next: NextFunction) {
        //악의적으로 user_id 추가했을때 대비, null로 변경
        req.body.user_id = null;
        if(req.body.access_token){
            let verifiedTokenData = verifyToken(req.body.access_token,"access",res);
            if(verifiedTokenData.user_id!==-1){
              //토큰값이 맞을대, null 수정
              req.body.user_id = verifiedTokenData.user_id;
            }else return;
        }
        next();
      // ${chalk.userAgent}
    }
  }