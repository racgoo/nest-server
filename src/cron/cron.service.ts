import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

import * as moment from 'moment-timezone';
import selectAllScheduleWithUTCStringModel from 'src/model/schedule/selectAllScheduleWithUTCStringModel';
import sendPushMessage from 'src/utils/push/sendPushMessage';
import formatToTimestamp from 'src/utils/time/formatToTimestamp';
import momentToUtcString from 'src/utils/time/momentToUtcString';
// import moment from 'moment-timezone';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  @Cron('* * * * * *') // 매 45초마다 실행됨
  async handleCron2() {
    let currentUtcString = momentToUtcString(moment());
    // let currentUtcString  = '2024-02-17 00:00:00';
    let pushMessages =await selectAllScheduleWithUTCStringModel({target_date: currentUtcString});
    pushMessages.some(pushMessage => {
      let formattedDueDate = formatToTimestamp(pushMessage.due_date);
      switch(pushMessage.repeat_type){
        case "WEEKLY":
          // pushMessage.due_date
          // sibal 이거 어려워
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
  
  @Cron('*/4 * * * * *') // 매 45초마다 실행됨
  handleCron() {
    // console.log(moment().format("YYYY-MM-DDTHH:mm:00.000Z"))
    // axios.post("https://jasoseol.com/employment/calendar_list.json",{
    //     "start_time": moment().subtract(2,"M").format("YYYY-MM-DDTHH:mm:00.000Z"),
    //     "end_time": moment().format("YYYY-MM-DDTHH:mm:00.000Z"),
    //     // "end_time": "2023-12-02T15:00:00.000Z",
    //     // "start_time": "2023-10-27T15:00:00.000Z"
    // }).then(res=>{
        
    //     console.log(res.data.employment.filter(d=>{
    //         if(moment(d.end_time) < moment())return false;
    //         if(d.employments.find(e => {
    //             if(e.duty_groups.find(k=>k.group_id === 175 || k.group_id === 173)){
    //                 return true;
    //             }else{
    //                 return false;
    //             }
    //         }))return true;
    //         else return false;
    //     })
    //     .sort((a,b) => moment(a.start_time) < moment(b.start_time))
    //     .map(a=>`[${a.name}]\n${a.title}\n${moment(a.end_time).format("마감:MM-DD-HH")}\n`))
    // }).catch(err=>{
    //     console.log(err)
    // })
  }
}