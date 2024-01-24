import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectAllScheduleModelPropsType {
    user_id: number;
}

export type selectAllScheduleModelReturnType = {
    schedule_id: number
    user_id: number
    title: string
    description: string
    register_date: string
    update_date: string
    due_date: string
    calendar_id: number
    is_done: boolean
    schedule_details: scheduleDetailType[]
}[]

const selectAllScheduleModel = async ({user_id}: selectAllScheduleModelPropsType): Promise<selectAllScheduleModelReturnType> => {
    let result = await sendQuery(`
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
        JOIN tbl_calendar C ON S.calendar_id = C.calendar_id
        LEFT OUTER JOIN 
            tbl_schedule_detail AS SD ON S.schedule_id = SD.schedule_id
        WHERE 
            S.user_id = ${escape(user_id)}
        GROUP BY S.schedule_id
        ORDER BY due_date ASC;
    `);
    result.some((schedule,index) => {result[index].schedule_details = JSON.parse(schedule.schedule_details)});
    return result;
}
export default selectAllScheduleModel;