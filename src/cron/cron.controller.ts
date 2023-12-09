import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as moment from 'moment-timezone';
// import moment from 'moment-timezone';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
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