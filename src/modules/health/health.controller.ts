import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { healthCheckRequestDto } from 'src/dtos/health/healthCheck';
import { Response } from 'express';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Post("/healthCheck")
    healthCheck(@Body() body: healthCheckRequestDto, @Res() res: Response): Promise<ResponseType> {
      return this.healthService.healthCheck(body,res);
    }

}
