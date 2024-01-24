import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import sendQueries from "src/utils/database/sendQueries";

export interface insertScheduleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    due_date: string;
}

export type insertScheduleModelReturnType =scheduleType[]

const insertScheduleModel = async ({user_id,calendar_id,title,description,due_date}: insertScheduleModelPropsType): Promise<insertScheduleModelReturnType> => {
  
    return (await sendQueries([
        `
            INSERT INTO tbl_schedule (user_id, calendar_id, title, description, due_date)
            SELECT 
                user_id,
                calendar_id,
                ${escape(title)},
                ${escape(description)},
                ${escape(due_date)}
            FROM tbl_calendar
            WHERE user_id = ${escape(user_id)}
            AND calendar_id = ${escape(calendar_id)};
        `,
        `
            SELECT * FROM tbl_schedule WHERE schedule_id = LAST_INSERT_ID();
        `
    ]))[1];
}
export default insertScheduleModel;