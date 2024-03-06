import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import sendQueries from "src/utils/database/sendQueries";

export interface insertCalendarLabelModelPropsType {
    user_id: number;
    calendar_id: number;
    color: string;
    name: string;
}

export type insertCalendarLabelModelReturnType ={
    updatedRows: number;
    calendar_label_id: number;
}

const insertCalendarLabelModel = async ({user_id,calendar_id,color,name}: insertCalendarLabelModelPropsType): Promise<insertCalendarLabelModelReturnType> => {
    return (await sendQueries([
        `
            INSERT INTO tbl_calendar_label (user_id,calendar_id,color,name) VALUES(${escape(user_id)},${escape(calendar_id)},${escape(color)},${escape(name)});
        `,
        `
            SELECT LAST_INSERT_ID() AS calendar_label_id;
        `
    ]));
}
export default insertCalendarLabelModel;