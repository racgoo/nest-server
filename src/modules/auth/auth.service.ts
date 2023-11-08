import { postTest1ResponseDto, postTest1RequestDto } from './../../dtos/auth/postTest1';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import getChatModel from 'src/model/chat/getChatModel';
import { validate, ValidationError } from 'class-validator';

const kakao = {
    clientID: process.env.KAKAO_REST_API,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri: process.env.KAKAO_REDIRECT_URI_DEV,
    logoutUri:  process.env.KAKAO_LOGOUT_URI_DEV
};

@Injectable()
export class AuthService {

    getTest(): string {
        return 'Hello World!';
      }
    
    async postTest1(body: postTest1RequestDto): Promise<postTest1ResponseDto | ValidationError[]> {
        // let body = postTest2RequestDto(req.body);
        console.log("aa")
        let result2 = await redisClient.get(body.hi);
        console.log(result2)
        // redisClient.get("test",(err,result)=>{
        //     console.log(err)
        //     console.log(result);
        // })
        // console.log(result)
        // return new postTest1ResponseDto({"hi": "bb", "bye": "aa"});
        let result = plainToInstance(postTest1ResponseDto,{hi: result2, bye: "aa"});
        let validation = await validate(result);
        return validation.length===0 ? result : validation;
    }

    async postTest2(body: postTest2RequestDto): Promise<string> {
        // let body = postTest2RequestDto(req.body);
        let result = await getChatModel({chat_room_id: 0, limit: 30});
        return JSON.stringify(result);
    }

    getKakaoLogin(req: Request,res: Response): void {
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_image`;
        return res.redirect(kakaoAuthURL);
    }

    getKakaoLogout(req: Request,res: Response): void {
        const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakao.clientID}&logout_redirect_uri=${kakao.logoutUri}`;
        res.redirect(kakaoLogoutURL);
    }

    postKakaoLoginVerify(req: Request,res: Response): void {
        // let { code } = req.body;
        // checkType(code,typeList.string);
    
        // let tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token",QueryString.stringify({
        //     grant_type: 'authorization_code',
        //     client_id: kakao.clientID,
        //     client_secret: kakao.clientSecret,
        //     redirectUri: kakao.redirectUri,
        //     code: code
        // }),{
        //     headers: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //     }
        // });
       
        // if(!tokenResponse){
        //     return emitError(errors.Kakao_Callback_Code_Error);
        // }
        
        // let kakaoUserData = await axios({
        //     method: 'get',
        //     url: 'https://kapi.kakao.com/v2/user/me',
        //     headers: {
        //         Authorization: `Bearer ${tokenResponse.data.access_token}`
        //     }
        // });
        
        // if(!kakaoUserData){
        //     return emitError(errors.Kakao_Callback_Code_Error);
        // }
        
        // //insert user and oauth ( duplication check )
        
        // let generateResults = await insertKakaoUser(kakaoUserData.data.id,kakaoUserData?.data?.properties?.profile_image);
        
        // //check user ( check user is inserted )
        // let user = await getKakaoUserInfo(kakaoUserData.data.id);
        
        // if(!user || user.length===0){
        //     return emitError(errors.User_Not_Found);
        // }
        
        // user[0].token = generateToken(user[0].user_id);
        
        // return emitResponse(res,{
        //     data: user[0]
        // });
    }





    









}
