import sendQueries from "src/actions/database/sendQueries";
import { escape } from "mysql";
const insertKakaoUser = async (kakaoUserId: number,kakaoUserProfileImage?: string) => {
    return await sendQueries([
        `INSERT INTO user (nickname, image) VALUES('${escape(kakaoUserId)}님', ${escape(kakaoUserProfileImage)});`,
        `SET @new_user_id = LAST_INSERT_ID();`,
        `INSERT INTO oauth (user_id,platform,unique_key) VALUES(@new_user_id,'kakao','${escape(kakaoUserId)}');`
    ]);
}
export default insertKakaoUser;