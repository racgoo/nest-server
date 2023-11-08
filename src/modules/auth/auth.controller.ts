import { ValidationError } from 'class-validator';
import { postTest1RequestDto, postTest1ResponseDto } from './../../dtos/auth/postTest1';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { plainToClass, plainToInstance, TransformPlainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("/test")
    getHello(): string {
      return this.authService.getTest();
    }

    @Post("/test1")
    postTest1(@Body() body: postTest1RequestDto): Promise<postTest1ResponseDto | ValidationError[]> {
      return this.authService.postTest1(body);
    }

    @Post("/test2")
    postTest2(@Body() body: postTest2RequestDto): Promise<string> {
      return this.authService.postTest2(body);
    }

    @Get("/kakao/login")
    getKakaoLogin(@Req() req: Request, @Res() res: Response) : void {
      return this.authService.getKakaoLogin(req,res);
    }

    @Get("/kakao/logout")
    getKakaoLogout(@Req() req: Request, @Res() res: Response) : void {
      return this.authService.getKakaoLogout(req,res);
    }
    
    @Post("/kakao/loginVerify")
    postKakaoLoginVerify(@Req() req: Request, @Res() res: Response) : void {
      return this.authService.postKakaoLoginVerify(req,res);
    }


}
