import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { createScheduleRequestDto } from 'src/dtos/schedule/createSchedule';
import { createCalenderResponseDto } from 'src/dtos/calendar/createCalender';
import insertScheduleModel from 'src/model/schedule/insertScheduleModel';
import { getScheduleRequestDto, getScheduleResponseDto } from 'src/dtos/schedule/getSchedule';
import * as moment from 'moment';
import selectScheduleModel, { selectScheduleModelReturnType } from 'src/model/schedule/selectScheduleModel';
import momentToUtcString from 'src/utils/time/momentToUtcString';
import { deleteScheduleRequestDto, deleteScheduleResponseDto } from 'src/dtos/schedule/deleteSchedule';
import deleteScheduleModel from 'src/model/schedule/deleteScheduleModel';
import convertTinyintToBoolean from 'src/utils/converter/convertTinyintToBoolean';
import { checkScheduleRequestDto, checkScheduleResponseDto } from 'src/dtos/schedule/checkSchedule';
import checkScheduleModel from 'src/model/schedule/checkScheduleModel';
import selectAllScheduleModel from 'src/model/schedule/selectAllScheduleModel';
import { searchScheduleRequestDto, searchScheduleResponseDto } from 'src/dtos/schedule/searchSchedule';
import selectScheduleByTitleModel, { selectScheduleByTitleModelReturnType } from 'src/model/schedule/selectScheduleByTitleModel';

@Injectable()
export class ScheduleService {
    async createSchedule(body: createScheduleRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let result = await insertScheduleModel({
            calendar_id: body.calendar_id,
            title: body.title,
            description: body.description ?? "",
            due_date: body.due_date,
            user_id: body.user_id
        });
        if(result.length===0){
            return generateResponse.INTERNAL_SERVER_ERROR({res, message: "오류가 발생했습니다.\n다시 시도해 주세요.", dto: createCalenderResponseDto});
        }else{
            return generateResponse.SUCCESS({res, data: {newSchedule: result[0]}, dto: createScheduleRequestDto});
        }
    }

    async getSchedule(body: getScheduleRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let scheduleList: selectScheduleModelReturnType;
        if(body.target_date){
            scheduleList = await selectScheduleModel({
                calendar_id: body.calendar_id,
                user_id: body.user_id,
                start_date:   momentToUtcString(moment(body.target_date).subtract("M",2)),
                end_date: momentToUtcString(moment(body.target_date).add("M",2)),
            });
        }else{
            scheduleList = await selectAllScheduleModel({
                user_id: body.user_id
            });
        }
        scheduleList = scheduleList.map(schedule => convertTinyintToBoolean(schedule,["is_done"]));
        return generateResponse.SUCCESS({res, data: {scheduleList}, dto: getScheduleResponseDto});
    }

    async deleteSchedule(body: deleteScheduleRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let result = await deleteScheduleModel({user_id: body.user_id, schedule_id: body.schedule_id});
        if(result===null)return generateResponse.INTERNAL_SERVER_ERROR({res});
        if(result.updatedRows===0)return generateResponse.ENTITY_NOT_FOUND({res,message: "존재하지 않는 일정입니다."});
        return generateResponse.SUCCESS({res, data: {}, dto: deleteScheduleResponseDto});
    }

    async checkSchedule(body: checkScheduleRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let result = await checkScheduleModel({schedule_id: body.schedule_id, user_id: body.user_id});
        if(result===null)return generateResponse.INTERNAL_SERVER_ERROR({res});
        if(result.updatedRows===0)return generateResponse.ENTITY_NOT_FOUND({res,message: "존재하지 않는 일정입니다."});
        return generateResponse.SUCCESS({res, data: {}, dto: checkScheduleResponseDto});
    }

    async searchSchedule(body: searchScheduleRequestDto, res: Response): Promise<ResponseType> {
        if(body.user_id===null)return generateResponse.ACCESS_DENIED({res});
        let scheduleList: selectScheduleByTitleModelReturnType;
        if(body.title===""){
            scheduleList = [];
        }else{
            scheduleList = await selectScheduleByTitleModel({ user_id: body.user_id,calendar_id: body.calendar_id, title: body.title });
        }
        scheduleList = scheduleList.map(schedule => convertTinyintToBoolean(schedule,["is_done"]));
        return generateResponse.SUCCESS({res, data: {scheduleList}, dto: searchScheduleResponseDto});
    } 
}
