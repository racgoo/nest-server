import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { getCalendarListRequestDto, getCalendarListResponseDto } from 'src/dtos/calendar/getCalendarList';
import getCalendarListModel from 'src/model/calendar/getCalendarListModel';
import { createCalenderRequestDto, createCalenderResponseDto } from 'src/dtos/calendar/createCalender';
import insertCalenderModel from 'src/model/calendar/insertCalenderModel';
import { deleteCalenderRequestDto, deleteCalenderResponseDto } from 'src/dtos/calendar/deleteCalendar';
import deleteCalendarModel from 'src/model/calendar/deleteCalendarModel';

@Injectable()
export class CalendarService {
    async getCalendarList(body: getCalendarListRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let calendarList = await getCalendarListModel({user_id: body?.user_id});
        return generateResponse.SUCCESS({res, data: {calendarList}, dto: getCalendarListResponseDto});
    }

    async createCalendar(body: createCalenderRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let result = await insertCalenderModel({user_id: body.user_id, calenderName: body.calendarName});
        if(result===null)return generateResponse.INTERNAL_SERVER_ERROR({res});
        if(result.affectedRows===0)return generateResponse.ENTITY_DUPLICATED({res});
        return generateResponse.SUCCESS({res, data: {}, dto: createCalenderResponseDto});
    }

    async deleteCalendar(body: deleteCalenderRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let result = await deleteCalendarModel({user_id: body.user_id, calendar_id: body.calendar_id});
        if(result===null)return generateResponse.INTERNAL_SERVER_ERROR({res});
        if(result.updatedRows===0)return generateResponse.ENTITY_NOT_FOUND({res,message: "존재하지 않는 캘린더입니다."});
        return generateResponse.SUCCESS({res, data: {}, dto: deleteCalenderResponseDto});
    }
}
