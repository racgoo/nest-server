import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface insertScheduleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    due_date: string;
}

export type insertScheduleModelReturnType ={
    updatedRows: number
}

const insertScheduleModel = async ({user_id,calendar_id,title,description,due_date}: insertScheduleModelPropsType): Promise<insertScheduleModelReturnType> => {
    return await sendQuery(`
        INSERT INTO tbl_schedule (user_id, calendar_id, title, description, due_date)
        (SELECT 
            user_id,
            calendar_id,
            ${escape(title)},
            ${escape(description)},
            ${escape(due_date)}
        FROM tbl_calendar
        WHERE user_id = ${escape(user_id)}
        AND calendar_id = ${escape(calendar_id)});
    `);
}
export default insertScheduleModel;