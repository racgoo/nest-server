import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectScheduleByTitleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
}

export type selectScheduleByTitleModelReturnType = scheduleType[]

const selectScheduleByTitleModel = async ({user_id,calendar_id,title}: selectScheduleByTitleModelPropsType): Promise<selectScheduleByTitleModelReturnType> => {
    let result = await sendQuery(`
        SELECT 
            S.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'schedule_info_id', SI.schedule_info_id,
                    'schedule_id',SI.schedule_id,
                    'register_date',SI.register_date,
                    'update_date',SI.update_date,
                    'done_Yn',SI.done_Yn,
                    'target_date', SI.target_date,
                    'user_id', SI.user_id
                )
            ) AS schedule_infos
        FROM 
            tbl_schedule AS S
        JOIN tbl_calendar C ON S.calendar_id = C.calendar_id
        LEFT OUTER JOIN 
            tbl_schedule_info AS SI ON S.schedule_id = SI.schedule_id
        WHERE 
            S.user_id = ${escape(user_id)} AND C.calendar_id = ${escape(calendar_id)} AND S.title LIKE ${escape("%"+title+"%")}
        GROUP BY S.schedule_id
        ORDER BY due_date ASC;
    `);
    result.some((schedule,index) => {result[index].schedule_infos = JSON.parse(schedule.schedule_infos)});
    return result;
}
export default selectScheduleByTitleModel;