import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface updateLabelSequnceModelPropsType {
    user_id: number;
    calendar_id: number;
    label_sequence_comma_string: string;
}

export type updateLabelSequnceModelReturnType ={
    affectedRows: number
    changedRows: number
}

const updateLabelSequnceModel = async ({user_id,calendar_id,label_sequence_comma_string}: updateLabelSequnceModelPropsType): Promise<updateLabelSequnceModelReturnType> => {
    return await sendQuery(`
        UPDATE tbl_calendar SET label_sequence_comma_string = ${escape(label_sequence_comma_string)} WHERE user_id = ${escape(user_id)} AND calendar_id = ${escape(calendar_id)};
    `);
}
export default updateLabelSequnceModel;