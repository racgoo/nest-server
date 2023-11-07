// import emitError from "../error/emitError";
// import errors from "../error/errors";
import * as jwt from "jsonwebtoken";
import { tokenDataType } from "./token.model";

const verifyToken = (token: string): tokenDataType => {
    let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if (err.message === 'jwt expired') {
            //     return emitError(errors.Expired_Token);
            // } else if (err.message === 'invalid token') {
            //     return emitError(errors.Invalid_Token);
            // } else {
            //     return emitError(errors.Invalid_Token);
            // }
    }
    return decoded;
} 
export default verifyToken;