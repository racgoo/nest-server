import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { authByRefreshTokenRequestDto } from 'src/dtos/auth/authByRefreshToken';
import { CalendarService } from './calendar.service';
import { getCalendarListRequestDto } from 'src/dtos/calendar/getCalendarList';
import { createCalenderRequestDto } from 'src/dtos/calendar/createCalender';
import { deleteCalenderRequestDto } from 'src/dtos/calendar/deleteCalendar';
import { saveCalendarLabelListRequestDto } from 'src/dtos/calendar/saveCalendarLabelList';
import { getCalendarLabelListRequestDto } from 'src/dtos/calendar/getCalendarLabelList';
import { deleteCalendarLabelRequestDto } from 'src/dtos/calendar/deleteCalendarLabel';

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

    @Post("/getCalendarLabelList")
    getCalendarLabelList(@Body() body: getCalendarLabelListRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.getCalendarLabelList(body,res);
    }

    @Post("/saveCalendarLabelList")
    saveCalendarLabelList(@Body() body: saveCalendarLabelListRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.saveCalendarLabelList(body,res);
    }

    @Post("/deleteCalendarLabel")
    deleteCalendarLabel(@Body() body: deleteCalendarLabelRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.calendarService.deleteCalendarLabel(body,res);
    }
}
