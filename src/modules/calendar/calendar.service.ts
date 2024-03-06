import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import {
  getCalendarListRequestDto,
  getCalendarListResponseDto,
} from 'src/dtos/calendar/getCalendarList';
import getCalendarListModel from 'src/model/calendar/getCalendarListModel';
import {
  createCalenderRequestDto,
  createCalenderResponseDto,
} from 'src/dtos/calendar/createCalender';
import insertCalenderModel from 'src/model/calendar/insertCalenderModel';
import {
  deleteCalenderRequestDto,
  deleteCalenderResponseDto,
} from 'src/dtos/calendar/deleteCalendar';
import deleteCalendarModel from 'src/model/calendar/deleteCalendarModel';
import {
  saveCalendarLabelListRequestDto,
  saveCalendarLabelListResponseDto,
} from 'src/dtos/calendar/saveCalendarLabelList';
import updateCalendarLabelModel from 'src/model/calendar/updateCalendarLabelModel';
import insertCalendarLabelModel from 'src/model/calendar/insertCalendarLabelModel';
import {
  getCalendarLabelListRequestDto,
  getCalendarLabelListResponseDto,
} from 'src/dtos/calendar/getCalendarLabelList';
import getCalendarLabelListModel, { getCalendarLabelListModelReturnType } from 'src/model/calendar/getCalendarLabelListModel';
import updateLabelSequnceModel from 'src/model/calendar/updateLabelSequnceModel';
import getCalendarModel from 'src/model/calendar/getCalendarModel';
import { deleteCalendarLabelRequestDto, deleteCalendarLabelResponseDto } from 'src/dtos/calendar/deleteCalendarLabel';
import deleteCalendarLabelModel from 'src/model/calendar/deleteCalendarLabelModel';

@Injectable()
export class CalendarService {
  async getCalendarList(
    body: getCalendarListRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let calendarList = await getCalendarListModel({ user_id: body?.user_id });
    return generateResponse.SUCCESS({
      res,
      data: { calendarList },
      dto: getCalendarListResponseDto,
    });
  }

  async createCalendar(
    body: createCalenderRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let result = await insertCalenderModel({
      user_id: body.user_id,
      calenderName: body.calendarName,
    });
    if (result === null) return generateResponse.INTERNAL_SERVER_ERROR({ res });
    if (result.affectedRows === 0)
      return generateResponse.ENTITY_DUPLICATED({
        res,
        message: '이미 같은 이름의 캘린더가 존재합니다.',
      });
    return generateResponse.SUCCESS({
      res,
      data: {},
      dto: createCalenderResponseDto,
    });
  }

  async deleteCalendar(
    body: deleteCalenderRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let result = await deleteCalendarModel({
      user_id: body.user_id,
      calendar_id: body.calendar_id,
    });
    if (result === null) return generateResponse.INTERNAL_SERVER_ERROR({ res });
    if (result.updatedRows === 0)
      return generateResponse.ENTITY_NOT_FOUND({
        res,
        message: '존재하지 않는 캘린더입니다.',
      });
    return generateResponse.SUCCESS({
      res,
      data: {},
      dto: deleteCalenderResponseDto,
    });
  }

  async saveCalendarLabelList(
    body: saveCalendarLabelListRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let tasks = [];
    let calendarId: number;
    body.labelList.some((label) => {
      calendarId = label.calendar_id;
      if (label.calendar_label_id) {
        tasks.push(
          updateCalendarLabelModel({
            calendar_label_id: label.calendar_label_id,
            calendar_id: label.calendar_id,
            user_id: body.user_id,
            color: label.color,
            name: label.name,
          }),
        );
      } else {
        tasks.push(
          insertCalendarLabelModel({
            calendar_id: label.calendar_id,
            user_id: body.user_id,
            name: label.name,
            color: label.color,
          }),
        );
      }
    });
    let results = await Promise.all(tasks);
    let isError = false;
    body.labelList = body.labelList.map((label, labelIndex) => {
      if (!label.calendar_label_id) {
        if(results[labelIndex]===null){
          isError = true;
        }else{
          label.calendar_label_id = results[labelIndex][1][0].calendar_label_id;
        }
      }else{
        if(results[labelIndex]===null){
          isError = true;
        }
      }
      return label;
    });
    if(isError){
      return generateResponse.BAD_REQUEST({
        res,
        message: "중복되지 않은 명칭을 입력해주세요.",
        data: {},
        dto: saveCalendarLabelListResponseDto,
      });
    }
    await updateLabelSequnceModel({
      calendar_id: calendarId,
      user_id: body.user_id,
      label_sequence_comma_string: body.labelList
        .map((label) => label.calendar_label_id)
        .join(','),
    });
    return generateResponse.SUCCESS({
      res,
      data: {},
      dto: saveCalendarLabelListResponseDto,
    });
  }

  async getCalendarLabelList(
    body: getCalendarLabelListRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let calendars: calendarType[] = await getCalendarModel({
      user_id: body.user_id,
      calendar_id: body.calendar_id,
    });
    let result = await getCalendarLabelListModel({
      user_id: body.user_id,
      calendar_id: body.calendar_id,
    });
    let labelsMapByCalendarLabelId = new Map();
    let isError = false;
    result.some((label) => {
      labelsMapByCalendarLabelId.set(label.calendar_label_id.toString(), label);
    });
    
    let sequencedResult: getCalendarLabelListModelReturnType;
    if(calendars.length===0){
      sequencedResult = result
    }else{
      sequencedResult = calendars[0].label_sequence_comma_string
        .split(',')
        .map((index) => {
          let label = labelsMapByCalendarLabelId.get(index);
          if (!label) {
            isError = true;
          }
          return label;
        });
      if (isError) {
        sequencedResult = result;
      }
    }
    
    return generateResponse.SUCCESS({
      res,
      data: { labelList: sequencedResult },
      dto: getCalendarLabelListResponseDto,
    });
  }

  async deleteCalendarLabel(
    body: deleteCalendarLabelRequestDto,
    res: Response,
  ): Promise<ResponseType> {
    if (body.user_id === null) return generateResponse.ACCESS_DENIED({ res });
    let calendars: calendarType[] = await getCalendarModel({
      user_id: body.user_id,
      calendar_id: body.label.calendar_id,
    });
    let deleteResult = await deleteCalendarLabelModel({label: body.label,user_id: body.user_id});
    if(deleteResult.affectedRows>0){
      await updateLabelSequnceModel({
        calendar_id: body.label.calendar_id,
        user_id: body.user_id,
        label_sequence_comma_string: calendars[0].label_sequence_comma_string.split("").filter(label_id => parseInt(label_id) !== body.label.calendar_label_id).join(",")
      });
    }
    return generateResponse.SUCCESS({res,data: {},dto: deleteCalendarLabelResponseDto,});
  }
}