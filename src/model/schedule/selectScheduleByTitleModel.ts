import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectScheduleByTitleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
}

export type selectScheduleByTitleModelReturnType = {
    schedule_id: number
    user_id: number
    title: string
    description: string
    register_date: string
    update_date: string
    due_date: string
    calendar_id: number
    is_done: boolean
}[]

const selectScheduleByTitleModel = async ({user_id,calendar_id,title}: selectScheduleByTitleModelPropsType): Promise<selectScheduleByTitleModelReturnType> => {
    return await sendQuery(`
        SELECT * FROM tbl_schedule
        WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)} AND title LIKE ${escape("%"+title+"%")}
        ORDER BY due_date ASC;
    `);
}
export default selectScheduleByTitleModel;