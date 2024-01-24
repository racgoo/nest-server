import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectScheduleModelPropsType {
    user_id: number;
    calendar_id: number;
    start_date: string;
    end_date: string;
}

export type selectScheduleModelReturnType = scheduleType[]


const selectScheduleModel = async ({user_id,calendar_id,start_date,end_date}: selectScheduleModelPropsType): Promise<selectScheduleModelReturnType> => {
    let result =  await sendQuery(`
        SELECT 
            S.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'schedule_detail_id', SD.schedule_detail_id,
                    'schedule_id',SD.schedule_id,
                    'user_id',SD.user_id,
                    'done_YN',SD.done_YN,
                    'short_target_date',SD.short_target_date
                )
            ) AS schedule_details
        FROM 
            tbl_schedule AS S
        LEFT OUTER JOIN 
            tbl_schedule_detail AS SD ON S.schedule_id = SD.schedule_id
        WHERE 
            S.user_id = ${escape(user_id)} AND S.calendar_id = ${escape(calendar_id)} AND due_date 
            BETWEEN ${escape(start_date)} AND ${escape(end_date)}
        GROUP BY S.schedule_id
        ORDER BY due_date ASC;
    `);
    result.some((schedule,index) => {result[index].schedule_details = JSON.parse(schedule.schedule_details)});
    return result;
}
export default selectScheduleModel;