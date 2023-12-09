import { ValidationError } from 'class-validator';
import { postTest1RequestDto, postTest1ResponseDto } from './../../dtos/auth/postTest1';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { plainToClass, plainToInstance, TransformPlainToInstance } from 'class-transformer';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { kakaoLoginVerifyRequestDto } from 'src/dtos/auth/kakaoLoginVerify';
import { authByUserTokenRequestDto } from 'src/dtos/auth/authByUserToken';

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

    @Post("/authByUserToken")
    authByUserToken(@Body() body: authByUserTokenRequestDto,@Res() res: Response): Promise<ResponseType> {
      // return this.authService.postTest1(body,res);
      console.log("hihi")
      return this.authService.authByUserToken(body,res);
    }

    @Get("/kakao/login")
    kakaoLogin(@Res() res: Response) : Promise<void> {
      return this.authService.kakaoLogin(res);
    }

    @Get("/kakao/logout")
    kakaoLogout(@Res() res: Response) : Promise<void> {
      return this.authService.kakaoLogout(res);
    }
    
    @Post("/kakao/loginVerify")
    kakaoLoginVerify(@Body() body: kakaoLoginVerifyRequestDto, @Res() res: Response) : Promise<ResponseType> {
      return this.authService.kakaoLoginVerify(body,res);
    }


}
