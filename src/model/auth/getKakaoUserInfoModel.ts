import sendQuery from "src/utils/database/sendQuery";
import { escape } from "mysql";

const getKakaoUserInfo = async (kakaoUserId: number) => {
    return await sendQuery(`
    SELECT user.user_id, user.e_mail, user.image, user.nickname, user.phone_number, oauth.platform, user.update_date, user.register_date  FROM user 
            LEFT JOIN oauth ON user.user_id = oauth.user_id
            WHERE platform = 'kakao' AND unique_key = '${escape(kakaoUserId)}';
    `)
}
export default getKakaoUserInfo;