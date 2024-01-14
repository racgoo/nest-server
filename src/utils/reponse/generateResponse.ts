import { Req, Res } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { response, Response } from "express";
// import {} from ""
// import { Response } from "@nestjs/common";


export class ResponseWithCode {
    readonly code: number;
    readonly message: string;
    readonly data: object | null;
    readonly type: string;
    constructor(code: number = 200, message: string = "",type: string = "", data: object | null = {}) {
      this.code = code;
      this.message = message;
      this.data = data;
      this.type = type;
    }
  }
  
  export type ResponseType = ResponseWithCode;
  
  interface generateErrorMethodPropsType {
    res: Response;
    data?: object | null;
    message?: string;
    code?: number;
    dto?: any;
  }
  
  const sendDataToClientWithLogger = async(res: Response,dto: any,finalResult: ResponseType) => {
    // if(dto){
    //   let dtoCheck: any = plainToInstance(dto,finalResult);
    //   let validation = await validate(dtoCheck);
    //   if(validation.length!==0){
    //     return generateResponse.INTERNAL_SERVER_ERROR({res});
    //   }
    // }
    res.locals.customResponse = finalResult;
    res.status(200).send(finalResult);
    return finalResult;
  }

  const generateResponse = {
    SUCCESS: ({res, data={}, message = "SUCCESS",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(200, message, "SUCCESS", data));
    },
    ENTITY_NOT_FOUND: ({res, data={}, message = "ENTITY_NOT_FOUND",dto=null}:generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(404, message, "ENTITY_NOT_FOUND"));
    },
    ACCESS_DENIED: ({res, data={}, message = "ACCESS_DENIED",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(403, message, "ACCESS_DENIED"));
    },
    ACCESS_EXPIRED: ({res, data={}, message = "ACCESS_EXPIRED",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(410, message, "ACCESS_EXPIRED"));
    },
    INTERNAL_SERVER_ERROR: ({res, data={}, message = "INTERNAL_SERVER_ERROR",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(500, message, "INTERNAL_SERVER_ERROR"));
    },
    BAD_REQUEST: ({res, data={}, message = "BAD_REQUEST",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(400, message, "BAD_REQUEST"));
    },
    ENTITY_DUPLICATED: ({res, data={}, message = "ENTITY_DUPLICATED",dto=null}: generateErrorMethodPropsType) => {
      return sendDataToClientWithLogger(res, dto, new ResponseWithCode(422, message, "ENTITY_DUPLICATED"));
    },
  }

  export default generateResponse;