import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectScheduleModelPropsType {
    user_id: number;
    calendar_id: number;
    start_date: string;
    end_date: string;
}

export type selectScheduleModelReturnType = {
    schedule_id: number
    user_id: number
    title: string
    description: string
    register_date: string
    update_date: string
    due_date: string
    calendar_id: number
}[]

const selectScheduleModel = async ({user_id,calendar_id,start_date,end_date}: selectScheduleModelPropsType): Promise<selectScheduleModelReturnType> => {
    return await sendQuery(`
        SELECT * FROM tbl_schedule 
        WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)} AND due_date
        BETWEEN ${escape(start_date)} AND ${escape(end_date)};
    `);
}
export default selectScheduleModel;