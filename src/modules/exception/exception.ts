import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import generateResponse from "src/utils/reponse/generateResponse";


@Catch(Error)
export class ServiceExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log()
    if(exception.message === "Bad Request Exception"){
        generateResponse.BAD_REQUEST({res: response,message: "잘못된 요청입니다."});
    }else{
        generateResponse.INTERNAL_SERVER_ERROR({res: response,message: "오류가 발생했습니다.\n잠시후 다시 시도해주세요."});
    }
    
  }
}