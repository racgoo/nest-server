import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getCalendarListModelPropsType {
    user_id: number;
}

export type getCalendarListModelReturnType =Array<calendarType>

const getCalendarListModel = async ({user_id}: getCalendarListModelPropsType): Promise<getCalendarListModelReturnType> => {
    return await sendQuery(`
        SELECT * FROM tbl_calendar WHERE user_id = ${escape(user_id)};
    `)
}
export default getCalendarListModel;