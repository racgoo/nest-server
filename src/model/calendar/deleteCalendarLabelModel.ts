import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import sendQueries from "src/utils/database/sendQueries";

export interface deleteCalendarLabelModelPropsType {
    label: labelType;
    user_id: number;
}

export type deleteCalendarLabelModelReturnType ={
    calendar_label_id: number;
    affectedRows: number
}

const deleteCalendarLabelModel = async ({label,user_id}: deleteCalendarLabelModelPropsType): Promise<deleteCalendarLabelModelReturnType> => {
    return await sendQuery(
        `
            DELETE FROM tbl_calendar_label WHERE user_id = ${escape(user_id)} AND calendar_label_id = ${escape(label.calendar_label_id)};
        `
    );
}
export default deleteCalendarLabelModel;