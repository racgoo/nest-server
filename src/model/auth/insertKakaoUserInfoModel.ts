import sendQueries from "src/utils/database/sendQueries";
import { escape } from "mysql";

interface insertUserByKakaoModelPropsType {
    kakaoUserId: number;
    kakaoUserProfileImage?: string;
}

const insertUserByKakaoWithDuplicateModel = async ({kakaoUserId,kakaoUserProfileImage}: insertUserByKakaoModelPropsType) => {
    return await sendQueries([
        `INSERT INTO tbl_user (nickname, image) VALUES('${escape(kakaoUserId)}님', ${escape(kakaoUserProfileImage)});`,
        `SET @new_user_id = LAST_INSERT_ID();`,
        `INSERT INTO oauth (user_id,platform,unique_key) VALUES(@new_user_id,'kakao','${escape(kakaoUserId)}');`
    ]);
}
export default insertUserByKakaoWithDuplicateModel;