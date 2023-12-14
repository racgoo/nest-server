import { escape } from "mysql";
import sendQuery from "src/utils/database/sendQuery";

interface insertRefreshTokenForceModelPropsType {
    new_refresh_token: string;
    user_id: number;
}

interface insertRefreshTokenForceModelReturnType {
    fieldCount: number
    affectedRows: number
    insertId: number
    info: string
    serverStatus: number
    warningStatus: number
    changedRows: number
}

const insertRefreshTokenForceModel = async ({user_id,new_refresh_token}: insertRefreshTokenForceModelPropsType): Promise<insertRefreshTokenForceModelReturnType> => {
    return await sendQuery(
        `
            UPDATE tbl_user 
            SET refresh_token = ${escape(new_refresh_token)}
            WHERE user_id = ${escape(user_id)};
        `
    );
}
export default insertRefreshTokenForceModel;