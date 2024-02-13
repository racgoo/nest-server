import sendQuery from 'src/utils/database/sendQuery';
import { escape } from 'mysql';
import sendQueries from 'src/utils/database/sendQueries';

export interface insertScheduleModelPropsType {
  user_id: number;
  calendar_id: number;
  title: string;
  description: string;
  due_date: string;
  is_done: boolean; //삭제해야함
  repeat_type: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${
    | '0'
    | '1'}${'0' | '1'}${'0' | '1'}`;
  interval_due_date: string;
  interval_num: number;
}

export type insertScheduleModelReturnType = scheduleType[];

const insertScheduleModel = async ({
  user_id,
  calendar_id,
  title,
  description,
  due_date,
  repeat_type,
  weekly_days_mask,
  interval_due_date,
  interval_num,
}: insertScheduleModelPropsType): Promise<insertScheduleModelReturnType> => {
  return (
    await sendQueries([
      `
      INSERT INTO tbl_schedule (user_id, calendar_id, title, description, due_date, repeat_type, weekly_days_mask, interval_due_date, interval_num)
      SELECT 
          user_id,
          calendar_id,
          ${escape(title)},
          ${escape(description)},
          ${escape(due_date)},
          ${escape(repeat_type)},
          ${escape(weekly_days_mask)},
          ${escape(interval_due_date === "" ? "2038-01-01 00:00:00" : interval_due_date)},
          ${escape(interval_num)}
      FROM tbl_calendar
      WHERE user_id = ${escape(user_id)}
      AND calendar_id = ${escape(calendar_id)};
        `,
      `
            SELECT * FROM tbl_schedule WHERE schedule_id = LAST_INSERT_ID();
        `,
    ])
  )[1];
};
export default insertScheduleModel;
