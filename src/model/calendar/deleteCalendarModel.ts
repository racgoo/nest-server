import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface deleteCalendarModelPropsType {
    user_id: number;
    calendar_id: number;
}

export type deleteCalendarModelReturnType ={
    updatedRows: number
}

const deleteCalendarModel = async ({user_id,calendar_id}: deleteCalendarModelPropsType): Promise<deleteCalendarModelReturnType> => {
    return await sendQuery(`
        DELETE FROM tbl_calendar WHERE user_id = ${escape(user_id)} and calendar_id = ${escape(calendar_id)};
    `);
}
export default deleteCalendarModel;