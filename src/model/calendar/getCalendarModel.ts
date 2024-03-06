import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getCalendarModelPropsType {
    user_id: number;
    calendar_id: number;
}

export type getCalendarModelReturnType =Array<calendarType>;

const getCalendarModel = async ({user_id,calendar_id}: getCalendarModelPropsType): Promise<getCalendarModelReturnType> => {
    return await sendQuery(`
        SELECT * FROM tbl_calendar WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)};
    `)
}
export default getCalendarModel;