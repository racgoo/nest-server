import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {  ScheduleService } from './schedule.service';
import { createScheduleRequestDto } from 'src/dtos/schedule/createSchedule';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { getScheduleRequestDto } from 'src/dtos/schedule/getSchedule';
import { deleteScheduleRequestDto } from 'src/dtos/schedule/deleteSchedule';
import { checkScheduleRequestDto } from 'src/dtos/schedule/checkSchedule';
import { searchScheduleRequestDto } from 'src/dtos/schedule/searchSchedule';


@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post("/createSchedule")
    createSchedule(@Body() body: createScheduleRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.scheduleService.createSchedule(body,res);
    }

    @Post("/getSchedule")
    getSchedule(@Body() body: getScheduleRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.scheduleService.getSchedule(body,res);
    }

    @Post("/deleteSchedule")
    deleteSchedule(@Body() body: deleteScheduleRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.scheduleService.deleteSchedule(body,res);
    }
    
    @Post("/checkSchedule")
    checkSchedule(@Body() body: checkScheduleRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.scheduleService.checkSchedule(body,res);
    }

    @Post("/searchSchedule")
    searchSchedule(@Body() body: searchScheduleRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.scheduleService.searchSchedule(body,res);
    }
}
