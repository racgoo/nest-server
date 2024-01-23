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
}[]

const selectAllScheduleModel = async ({user_id}: selectAllScheduleModelPropsType): Promise<selectAllScheduleModelReturnType> => {
    return await sendQuery(`
        SELECT s.*
        FROM tbl_schedule s
        JOIN tbl_calendar c ON s.calendar_id = c.calendar_id
        WHERE c.user_id = ${escape(user_id)}
        ORDER BY due_date ASC;
    `);
}
export default selectAllScheduleModel;