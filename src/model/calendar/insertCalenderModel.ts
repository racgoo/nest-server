import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface insertCalendarModelPropsType {
    user_id: number;
    calenderName: string;
}

export type insertCalendarModelReturnType ={
    affectedRows: number
    changedRows: number
}

const insertCalenderModel = async ({user_id,calenderName}: insertCalendarModelPropsType): Promise<insertCalendarModelReturnType> => {
    return await sendQuery(`
        INSERT IGNORE INTO tbl_calendar (user_id,title,description) VALUES (${escape(user_id)}, ${escape(calenderName)}, '');
    `);
}
export default insertCalenderModel;