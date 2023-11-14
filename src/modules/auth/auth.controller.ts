import { ValidationError } from 'class-validator';
import { postTest1RequestDto, postTest1ResponseDto } from './../../dtos/auth/postTest1';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { plainToClass, plainToInstance, TransformPlainToInstance } from 'class-transformer';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { postKakaoLoginVerifyRequestDto } from 'src/dtos/auth/postKakaoLoginVerify';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("/test")
    getHello(): string {
      return this.authService.getTest();
    }

    @Post("/test1")
    postTest1(@Body() body: postTest1RequestDto, @Res() res: Response): Promise<ResponseType> {
      return this.authService.postTest1(body,res);
    }

    @Post("/test2")
    postTest2(@Body() body: postTest2RequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.authService.postTest2(body,res);
    }

    @Get("/kakao/login")
    getKakaoLogin(@Res() res: Response) : Promise<void> {
      return this.authService.getKakaoLogin(res);
    }

    @Get("/kakao/logout")
    getKakaoLogout(@Res() res: Response) : Promise<void> {
      return this.authService.getKakaoLogout(res);
    }
    
    @Post("/kakao/loginVerify")
    postKakaoLoginVerify(@Body() body: postKakaoLoginVerifyRequestDto, @Res() res: Response) : Promise<ResponseType> {
      return this.authService.postKakaoLoginVerify(body,res);
    }


}
