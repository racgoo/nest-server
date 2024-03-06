import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getCalendarLabelListModelPropsType {
    user_id: number;
    calendar_id: number;
}

export type getCalendarLabelListModelReturnType =Array<labelType>

const getCalendarLabelListModel = async ({user_id,calendar_id}: getCalendarLabelListModelPropsType): Promise<getCalendarLabelListModelReturnType> => {
    return await sendQuery(`
        SELECT calendar_label_id, user_id, calendar_id, name, color FROM tbl_calendar_label WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)};
    `)
}
export default getCalendarLabelListModel;
