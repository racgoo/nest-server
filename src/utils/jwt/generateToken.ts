import * as jwt from "jsonwebtoken";
import { tokenDataType } from "./token.model";
require("dotenv").config();
const generateToken = (user_id: number): string => {
    return jwt.sign({user_id :user_id}, process.env.JWT_SECRET, {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "30d",  // 토큰 유효 기간
        issuer : "racgoo" // 발행자
    });
}
export default generateToken;