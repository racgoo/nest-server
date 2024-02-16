import sendQuery from 'src/utils/database/sendQuery';
import { escape } from 'mysql';

export interface selectAllScheduleWithUTCStringModelPropsType {
  target_date: string;
}

export type selectAllScheduleWithUTCStringModelReturnType = {
    title: string,
    description?: string,
    due_date: string,
    weekly_days_mask: string,
    interval_num: number,
    repeat_type: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
    expo_push_token: string,
    done_Yn?: "Y" | "N" | null
}[];

const selectAllScheduleWithUTCStringModel = async ({
  target_date
}: selectAllScheduleWithUTCStringModelPropsType): Promise<selectAllScheduleWithUTCStringModelReturnType> => {

  let result = await sendQuery(`
    SELECT 
        S.title as 'title',
        S.description as 'description',
        S.due_date as 'due_date',
        S.weekly_days_mask as 'weekly_days_mask',
        S.interval_num as 'interval_num',
        S.repeat_type as 'repeat_type',
        U.expo_push_token as 'expo_push_token',
        SI.done_Yn as 'done_Yn'
    FROM 
        tbl_schedule AS S
    LEFT JOIN 
        tbl_user AS U ON S.user_id = U.user_id
    LEFT OUTER JOIN 
        tbl_schedule_info AS SI ON S.schedule_id = SI.schedule_id AND SI.target_date = ${escape(target_date)}
    WHERE 
    (( S.repeat_type = 'ONCE' AND S.due_date = ${escape(target_date)}  ) OR ( S.repeat_type != 'ONCE' AND TIME(S.due_date) = TIME(${escape(target_date)})  )) AND
    ( SI.done_Yn = "N" OR ISNULL(SI.done_Yn)) AND 
    ( S.interval_due_date > ${escape(target_date)});
`);
  return result;
};
export default selectAllScheduleWithUTCStringModel;
