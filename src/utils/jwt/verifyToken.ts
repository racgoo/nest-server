// import emitError from "../error/emitError";
// import errors from "../error/errors";
import * as jwt from "jsonwebtoken";
import { tokenDataType } from "./token.model";
import generateResponse from "../reponse/generateResponse";
import { Response } from "express";

const verifyToken = (token: string,type: "access" | "refresh",res: Response): tokenDataType => {
    let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (['jwt expired'].includes(err.message)) {
                if(type==="access"){
                    generateResponse.ACCESS_EXPIRED({res, message: "만료된 토큰입니다." });
                }else{
                    generateResponse.ACCESS_DENIED({res, message: `다시 로그인 해주세요.` });    
                }
            } else if (['invalid token','jwt malformed','jwt must be provided'].includes(err.message)) {
                generateResponse.ACCESS_DENIED({res, message: "잘못된 토큰을 사용한 접근입니다." });
            }else{
                generateResponse.ACCESS_DENIED({res, message: "잘못된 토큰을 사용한 접근입니다." });
            }
            return {user_id: -1};
        }
    return decoded;
} 
export default verifyToken;