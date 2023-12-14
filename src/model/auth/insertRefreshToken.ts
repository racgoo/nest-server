import { escape } from "mysql";
import sendQuery from "src/utils/database/sendQuery";

interface insertRefreshTokenModelPropsType {
    current_refresh_token: string;
    new_refresh_token: string;
    user_id: number;
}

interface getUserInfoByUserIdModelReturnType {
    fieldCount: number
    affectedRows: number
    insertId: number
    info: string
    serverStatus: number
    warningStatus: number
    changedRows: number
}

const insertRefreshTokenModel = async ({user_id,current_refresh_token,new_refresh_token}: insertRefreshTokenModelPropsType): Promise<getUserInfoByUserIdModelReturnType> => {
    return await sendQuery(
        `
            UPDATE tbl_user 
            SET refresh_token = ${escape(new_refresh_token)}
            WHERE refresh_token  = ${escape(current_refresh_token)} AND user_id = ${escape(user_id)};
        `
    );
}
export default insertRefreshTokenModel;