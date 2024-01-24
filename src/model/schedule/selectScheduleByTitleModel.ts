import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectScheduleByTitleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
}

export type selectScheduleByTitleModelReturnType = scheduleType[]

const selectScheduleByTitleModel = async ({user_id,calendar_id,title}: selectScheduleByTitleModelPropsType): Promise<selectScheduleByTitleModelReturnType> => {
    // WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)} AND title LIKE ${escape("%"+title+"%")}
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
            S.user_id = ${escape(user_id)} AND C.calendar_id = ${escape(calendar_id)} AND S.title LIKE ${escape("%"+title+"%")}
        GROUP BY S.schedule_id
        ORDER BY due_date ASC;
    `);
    result.some((schedule,index) => {result[index].schedule_details = JSON.parse(schedule.schedule_details)});
    return result;
}
export default selectScheduleByTitleModel;