// import emitError from "../error/emitError";
// import errors from "../error/errors";
import * as jwt from "jsonwebtoken";
import { tokenDataType } from "./token.model";
import generateResponse from "../reponse/generateResponse";
import { Response } from "express";

const verifyToken = (token: string,res: Response): tokenDataType => {
    let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.message === 'jwt expired') {
                generateResponse.ACCESS_DENIED({res, message: "다시 로그인을 진행해 주세요." });
            } else if (err.message === 'invalid token') {
                generateResponse.ACCESS_DENIED({res, message: "잘못된 접근입니다." });
            } else {
                console.log(err)
                throw new Error();
            }
    }
    return decoded;
} 
export default verifyToken;