

import sendQuery from 'src/utils/database/sendQuery';
import { escape } from 'mysql';
import sendQueries from 'src/utils/database/sendQueries';

export interface updateSpecialDayModelPropsType {
    local_date_number: number;
    holiday_Yn: "Y" | "N";
    name: string;
}

export type updateSpecialDayModelReturnType = {
    updatedRows: number;
};

const updateSpecialDayModel = async ({
    local_date_number,
    holiday_Yn,
    name
}: updateSpecialDayModelPropsType): Promise<updateSpecialDayModelReturnType> => {
  return (
    await sendQuery(
      `
        INSERT INTO tbl_special_day (local_date_number,name, holiday_Yn)
        VALUES (${escape(local_date_number)},${escape(name)},${escape(holiday_Yn)})
        ON DUPLICATE KEY UPDATE name = VALUES(name), holiday_Yn = VALUES(holiday_Yn);
      `
    )
  );
};
export default updateSpecialDayModel;
