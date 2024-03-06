import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import sendQueries from "src/utils/database/sendQueries";

export interface updateCalendarLabelModelPropsType {
    user_id: number;
    calendar_label_id: number;
    calendar_id: number;
    color: string;
    name: string;
}

export type updateCalendarLabelModelReturnType ={
    affectedRows: number;
    changedRows: number;
    calendar_label_id: number;
}

const updateCalendarLabelModel = async ({user_id,calendar_id,color,name,calendar_label_id}: updateCalendarLabelModelPropsType): Promise<updateCalendarLabelModelReturnType> => {
    return (await sendQuery(
        `
            UPDATE tbl_calendar_label SET color = ${escape(color)}, name = ${escape(name)} WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)} AND calendar_label_id = ${escape(calendar_label_id)};
        `
    ));
}
export default updateCalendarLabelModel;