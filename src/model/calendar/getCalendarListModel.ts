import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getCalendarListModelPropsType {
    user_id: number;
}

export type getCalendarListModelReturnType =Array<{
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    register_date: string;
    update_date: string;
}>

const getCalendarListModel = async ({user_id}: getCalendarListModelPropsType): Promise<getCalendarListModelReturnType> => {
    return await sendQuery(`
        SELECT * FROM tbl_calendar WHERE user_id = ${escape(user_id)};
    `)
}
export default getCalendarListModel;