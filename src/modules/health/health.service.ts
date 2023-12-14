import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { healthCheckRequestDto, healthCheckResponseDto } from 'src/dtos/health/healthCheck';

@Injectable()
export class HealthService {
    async healthCheck(body: healthCheckRequestDto, res: Response): Promise<ResponseType> {
        // const test = async()=>{
        //     return new Promise((resolve,reject): any => {
        //         return setTimeout(()=>{
        //             resolve("test");
        //         },10000);
        //     });
        // }
        
        // console.log(await test());
        return generateResponse.SUCCESS({res, data: {dummy: body.dummy},dto: healthCheckResponseDto});
      }

}
