import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import * as moment from "moment";
import momentToUtcString from "src/utils/time/momentToUtcString";
import momentResetTime from "src/utils/time/momentResetTime";

export interface checkScheduleModelPropsType {
    user_id: number;
    schedule_id: number;
    target_date?: string;
}

export type checkScheduleModelReturnType ={
    updatedRows: number
}


const checkScheduleModel = async ({user_id,schedule_id,target_date}: checkScheduleModelPropsType): Promise<checkScheduleModelReturnType> => {
    return await sendQuery(`
        INSERT INTO tbl_schedule_info ( schedule_id,user_id, done_Yn, target_date) 
        VALUES ( ${escape(schedule_id)}, ${escape(user_id)}, 'Y' , ${escape(target_date)})
        ON DUPLICATE KEY UPDATE 
        done_Yn = CASE 
            WHEN done_Yn = 'Y' THEN 'N'
            ELSE 'Y'
        END;
    `)
}
export default checkScheduleModel;