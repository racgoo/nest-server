import sendQuery from 'src/utils/database/sendQuery';
import { escape } from 'mysql';

export interface selectScheduleModelPropsType {
  user_id: number;
  calendar_id: number;
  start_date: string;
  end_date: string;
}

export type selectScheduleModelReturnType = scheduleType[];

const selectScheduleModel = async ({
  user_id,
  calendar_id,
  start_date,
  end_date,
}: selectScheduleModelPropsType): Promise<selectScheduleModelReturnType> => {
  let result = await sendQuery(`
        SELECT 
            S.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'schedule_info_id', SI.schedule_info_id,
                    'schedule_id',SI.schedule_id,
                    'register_date',SI.register_date,
                    'update_date',SI.update_date,
                    'done_Yn',SI.done_Yn,
                    'target_date', SI.target_date,
                    'user_id', SI.user_id
                )
            ) AS schedule_infos
        FROM 
            tbl_schedule AS S
        LEFT JOIN 
            tbl_schedule_info AS SI ON S.schedule_id = SI.schedule_id
        WHERE 
            S.user_id = ${escape(user_id)} 
            ${calendar_id===0 ? "" : `AND S.calendar_id = ${escape(calendar_id,)} `}
            AND (
                    ( S.due_date BETWEEN ${escape(start_date)} AND ${escape(end_date)} )
                OR
                    ( S.interval_due_date > ${escape(end_date)} )
            )
        GROUP BY S.schedule_id
        ORDER BY due_date ASC;
    `);
  result.some((schedule, index) => {
    result[index].schedule_infos = JSON.parse(schedule.schedule_infos);
  });
  return result;
};
export default selectScheduleModel;
