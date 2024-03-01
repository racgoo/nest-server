import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface selectAllScheduleModelPropsType {
    user_id: number;
}

export type selectAllScheduleModelReturnType = scheduleType[];

const selectAllScheduleModel = async ({user_id}: selectAllScheduleModelPropsType): Promise<selectAllScheduleModelReturnType> => {
    let result = await sendQuery(`
        SELECT 
            S.*
        FROM 
            tbl_schedule AS S
        WHERE 
            S.user_id = ${escape(user_id)}
    `);
    result.some((schedule,index) => {result[index].schedule_infos = []});
    return result;
}
export default selectAllScheduleModel;