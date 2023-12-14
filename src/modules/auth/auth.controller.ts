import { ValidationError } from 'class-validator';
import { postTest1RequestDto, postTest1ResponseDto } from './../../dtos/auth/postTest1';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { plainToClass, plainToInstance, TransformPlainToInstance } from 'class-transformer';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { kakaoLoginVerifyRequestDto } from 'src/dtos/auth/kakaoLoginVerify';
import { authByRefreshTokenRequestDto } from 'src/dtos/auth/authByRefreshToken';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/authByRefreshToken")
    authByRefreshToken(@Body() body: authByRefreshTokenRequestDto,@Res() res: Response): Promise<ResponseType> {
      return this.authService.authByRefreshToken(body,res);
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
