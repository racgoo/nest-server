import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { authByRefreshTokenRequestDto } from 'src/dtos/auth/authByRefreshToken';
import { CalendarService } from './calendar.service';
import { getCalendarListRequestDto } from 'src/dtos/calendar/getCalendarList';
import { createCalenderRequestDto } from 'src/dtos/calendar/createCalender';
import { deleteCalenderRequestDto } from 'src/dtos/calendar/deleteCalendar';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Post("/getCalendarList")
    getCalendarList(@Body() body: getCalendarListRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.getCalendarList(body,res);
    }

    @Post("/createCalendar")
    createCalendar(@Body() body: createCalenderRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.createCalendar(body,res);
    }

    @Post("/deleteCalendar")
    delteCalendar(@Body() body: deleteCalenderRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.deleteCalendar(body,res);
    }
}
