import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface deleteScheduleModelPropsType {
    user_id: number;
    schedule_id: number;
}

export type deleteScheduleModelReturnType ={
    updatedRows: number
}

const deleteScheduleModel = async ({user_id,schedule_id}: deleteScheduleModelPropsType): Promise<deleteScheduleModelReturnType> => {
    return await sendQuery(`
        DELETE FROM tbl_schedule WHERE user_id = ${escape(user_id)} and schedule_id = ${escape(schedule_id)};
    `);
}
export default deleteScheduleModel;