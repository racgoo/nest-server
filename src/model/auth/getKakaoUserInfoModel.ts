import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

export interface getUserInfoByKakaoModelPropsType {
    kakaoUserId: string;
}

export type getUserInfoByKakaoModelReturnType =Array<{
    user_id: number
    e_mail: string
    image: string
    nickname: string
    phone_number: string
    platform: string
    update_date: string
    register_date: string
    refresh_token: string
}>

const getUserInfoByKakaoModel = async ({kakaoUserId}: getUserInfoByKakaoModelPropsType): Promise<getUserInfoByKakaoModelReturnType> => {
    return await sendQuery(`
    SELECT tbl_user.user_id, tbl_user.e_mail, tbl_user.image, tbl_user.nickname, tbl_user.phone_number, tbl_oauth.platform, tbl_user.update_date, tbl_user.register_date  FROM tbl_user 
    LEFT JOIN tbl_oauth ON tbl_user.user_id = tbl_oauth.user_id
    WHERE platform = 'kakao' AND unique_key = ${escape(kakaoUserId)};
    `)
}
export default getUserInfoByKakaoModel;