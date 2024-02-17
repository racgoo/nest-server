import * as moment from "moment";
import momentToUtcString from "src/utils/time/momentToUtcString";
import momentResetTime from "../time/momentResetTime";
import formatToTimestamp from "../time/formatToTimestamp";
const addDummyScheduleInfo = (scheduleList: scheduleType[],start_date: string,end_date: string): scheduleType[] => {
    let moment_end_date = moment(end_date);
    let moment_start_date = moment(start_date);
    return scheduleList.map(schedule => {
        let existDic = new Set();
        schedule.schedule_infos.some(info => {
            if(info.done_Yn!==null){
                existDic.add(info.target_date);
            }
        })
        switch(schedule.repeat_type){
            case "ONCE": 
                return ({
                    ...schedule,
                    schedule_infos: schedule.schedule_infos.map(info => {
                        if(info.done_Yn === null){
                            return ({
                                ...info,
                                done_Yn: "N",
                                schedule_id: schedule.schedule_id,
                                target_date: schedule.due_date,
                                user_id: schedule.user_id
                            })
                        }else return info;
                    })
                })
                break;
            default: 
            let newInfos: scheduleInfoType[] = schedule.schedule_infos;
            let current = (moment((schedule.due_date)));
            let weeklyCounter = 0;
            while(current.isSameOrBefore(moment_end_date)){
                let cloneCurrent = current.clone();
                if(!existDic.has(momentToUtcString(cloneCurrent))){
                    if(schedule.repeat_type==="WEEKLY" && ( schedule.weekly_days_mask[current.day()]==="0" || weeklyCounter % schedule.interval_num!==0 )){
                        // 한국 기준으로만 변환했음.. 나중에 수정 필요
                    }else{
                        newInfos.push({
                            schedule_info_id: null,
                            register_date: null,
                            update_date: null,
                            user_id: schedule.user_id,
                            done_Yn: "N",
                            schedule_id: schedule.schedule_id,
                            target_date: momentToUtcString(cloneCurrent)
                        })
                    }
                }
                let unit: "day" | "week" | "month" | "year" = "day";
                let interval = 1;
                switch(schedule.repeat_type){
                    case "DAILY": unit = "day";
                        break;
                    case "WEEKLY": unit = "day"
                        break;
                    case "MONTHLY": unit = "month";
                        interval=schedule.interval_num
                        break;
                    case "YEARLY": unit = "year";
                        interval=schedule.interval_num
                        break;
                }
                current.add(interval,unit);
                if(current.day()===0){
                    weeklyCounter+=1;
                }
            }
            schedule.schedule_infos = newInfos.filter(info => info.done_Yn!==null);
            schedule.schedule_infos.sort((a,b) => moment(b.target_date).isBefore(moment(a.target_date)) === false ? 0 : 1 )
            return schedule;
        }
    }
    );
}
export default addDummyScheduleInfo;