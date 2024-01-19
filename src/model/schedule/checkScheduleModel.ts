import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface checkScheduleModelPropsType {
    user_id: number;
    schedule_id: number;
}

export type checkScheduleModelReturnType ={
    updatedRows: number
}

const checkScheduleModel = async ({user_id,schedule_id}: checkScheduleModelPropsType): Promise<checkScheduleModelReturnType> => {
    return await sendQuery(`
        UPDATE tbl_schedule
        SET is_done = NOT is_done
        WHERE schedule_id = ${escape(schedule_id)} AND user_id = ${escape(user_id)};
    `);
}
export default checkScheduleModel;