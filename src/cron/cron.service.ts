import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

import * as moment from 'moment-timezone';
import updateSpecialDayAction from 'src/action/updateSpecialDayAction';
import selectAllScheduleWithUTCStringModel from 'src/model/schedule/selectAllScheduleWithUTCStringModel';
import updateSpecialDayModel from 'src/model/schedule/updateSpecialDayModel';
import sendPushMessage from 'src/utils/push/sendPushMessage';
import formatToTimestamp from 'src/utils/time/formatToTimestamp';
import momentToUtcString from 'src/utils/time/momentToUtcString';
import sleep from 'src/utils/time/sleep';
import utcStringToMoment from 'src/utils/time/utcStringToMoment';
// import moment from 'moment-timezone';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  @Cron('0 * * * * *') // 매 45초마다 실행됨
  async handleCron1() {
    let currentMoment = moment(); //timezone 설정 들어가야함... ㅅㅂ
    let currentUtcString = momentToUtcString(currentMoment);
    let pushMessages =await selectAllScheduleWithUTCStringModel({target_date: currentUtcString});
    pushMessages.some((pushMessage,i) => {
      let formattedDueDate = formatToTimestamp(pushMessage.due_date);
      switch(pushMessage.repeat_type){
        case "WEEKLY":
          let weekDiff = Math.abs(currentMoment.clone().set('day',0).diff(utcStringToMoment(formattedDueDate).set("day",0), 'weeks'));
          if(weekDiff%pushMessage.interval_num!=0)return false;
          if(pushMessage.weekly_days_mask[currentMoment.tz("Asia/Seoul").get("day")]=="0")return false;
          break;
        case "MONTHLY":
          if((Math.abs(parseInt(currentUtcString.substr(2,2)) - parseInt(formattedDueDate.substr(2,2))) % 12) % pushMessage.interval_num !== 0)return false;
          if(currentUtcString.substr(8,2) !== formattedDueDate.substr(8,2))return false;
          break;
        case "YEARLY":
          if(Math.abs(parseInt(currentUtcString.substr(2,2)) - parseInt(formattedDueDate.substr(2,2))) % pushMessage.interval_num !== 0)return false;
          if(currentUtcString.substr(5,5) !== formattedDueDate.substr(5,5))return false;
          break;
      }
      sendPushMessage({expo_push_token: pushMessage.expo_push_token, title: pushMessage.title});
    });
  }
  
  @Cron('0 0 0 * * *') //1일에 한번씩 공휴일 업데이트 (2년치)
  async handleCron2() {
    //1일에 한번씩 공휴일 업데이트 (2년치)
    updateSpecialDayAction();
  }
}