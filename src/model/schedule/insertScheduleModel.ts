import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import sendQueries from "src/utils/database/sendQueries";

export interface insertScheduleModelPropsType {
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    due_date: string;
}

export type insertScheduleModelReturnType =scheduleType[]
// repeat_type	enum('ONCE','DAILY','WEEKLY','MONTHLY','YEARLY')
// daily_interval	int(11)
// weekly_interval	int(11)
// monthly_interval	int(11)
// yearly_interval	int(11)
// weekly_days_mask	varchar(7)
// interval_due_date	timestamp
const insertScheduleModel = async ({user_id,calendar_id,title,description,due_date}: insertScheduleModelPropsType): Promise<insertScheduleModelReturnType> => {
    console.log(`
    INSERT INTO tbl_schedule (user_id, calendar_id, title, description, due_date)
    SELECT 
        user_id,
        calendar_id,
        ${escape(title)},
        ${escape(description)},
        ${escape(due_date)}
    FROM tbl_calendar
    WHERE user_id = ${escape(user_id)}
    AND calendar_id = ${escape(calendar_id)};
`)
    return (await sendQueries([
        `
            INSERT INTO tbl_schedule (user_id, calendar_id, title, description, due_date)
            SELECT 
                user_id,
                calendar_id,
                ${escape(title)},
                ${escape(description)},
                ${escape(due_date)}
            FROM tbl_calendar
            WHERE user_id = ${escape(user_id)}
            AND calendar_id = ${escape(calendar_id)};
        `,
        `
            SELECT * FROM tbl_schedule WHERE schedule_id = LAST_INSERT_ID();
        `
    ]))[1];
}
export default insertScheduleModel;