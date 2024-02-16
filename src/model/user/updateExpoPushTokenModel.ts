import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";
import * as moment from "moment";
import momentToUtcString from "src/utils/time/momentToUtcString";
import momentResetTime from "src/utils/time/momentResetTime";

export interface updateExpoPushTokenModelPropsType {
    user_id: number;
    expo_push_token: string;
}

export type updateExpoPushTokenModelReturnType ={
    updatedRows: number
}


const updateExpoPushTokenModel = async ({user_id,expo_push_token}: updateExpoPushTokenModelPropsType): Promise<updateExpoPushTokenModelReturnType> => {
    return await sendQuery(`
        UPDATE tbl_user SET expo_push_token = ${escape(expo_push_token)} WHERE user_id = ${escape(user_id)};
    `)
}
export default updateExpoPushTokenModel;