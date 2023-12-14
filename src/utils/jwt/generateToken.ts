import * as jwt from "jsonwebtoken";
require("dotenv").config();
const generateToken = (user_id: number): {access_token: string, refresh_token: string} => {
    let access_token = jwt.sign({user_id :user_id, type: "access"}, process.env.JWT_SECRET, {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : 60*60,  // 토큰 유효 기간
        issuer : "racgoo" // 발행자
    });
    let refresh_token = jwt.sign({user_id :user_id, type: "refresh"}, process.env.JWT_SECRET, {
    algorithm : "HS256", // 해싱 알고리즘
        expiresIn : 60*60*24*7,  // 토큰 유효 기간
        issuer : "racgoo" // 발행자
    });
    return (
        {
            access_token,
            refresh_token
        }
    )
}
export default generateToken;