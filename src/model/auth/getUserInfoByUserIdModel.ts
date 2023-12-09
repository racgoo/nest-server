import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getUserInfoByUserIdModelPropsType {
    user_id: number;
}

export type getUserInfoByUserIdModelReturnType =Array<{
    user_id: number
    e_mail: string
    image: string
    nickname: string
    phone_number: string
    platform: string
    update_date: string
    register_date: string
}>

const getUserInfoByUserIdModel = async ({user_id}: getUserInfoByUserIdModelPropsType): Promise<getUserInfoByUserIdModelReturnType> => {
    return await sendQuery(`
    SELECT tbl_user.user_id, tbl_user.e_mail, tbl_user.image, tbl_user.nickname, tbl_user.phone_number, tbl_user.update_date, tbl_user.register_date  FROM tbl_user 
    WHERE tbl_user.user_id = ${escape(user_id)};
    `)
}
export default getUserInfoByUserIdModel;