import sendQuery from 'src/utils/database/sendQuery';
import { escape } from 'mysql';
import sendQueries from 'src/utils/database/sendQueries';
import * as moment from "moment"

export interface selectSpecialDayModelPropsType {
  start_date: string;
  end_date: string;
}

export type selectSpecialDayModelReturnType = specialDayType[];

const selectSpecialDayModel = async ({
  start_date,
  end_date,
}: selectSpecialDayModelPropsType): Promise<selectSpecialDayModelReturnType> => {
  let result = await sendQuery(`
        SELECT name, holiday_Yn, local_date_number FROM tbl_special_day 
        WHERE local_date_number BETWEEN ${escape(parseInt(moment(start_date).format("YYYYMMDD")))} AND ${escape(parseInt(moment(end_date).format("YYYYMMDD")))}
        ORDER BY local_date_number ASC;
    `);
  return result;
};
export default selectSpecialDayModel;

