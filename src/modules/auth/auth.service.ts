import { postTest1RequestDto } from './../../dtos/auth/postTest1';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import getChatModel from 'src/model/chat/getChatModel';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { postKakaoLoginVerifyRequestDto, postKakaoLoginVerifyResponseDto } from 'src/dtos/auth/postKakaoLoginVerify';
import QueryString from "qs";
import axios from "axios";
import insertUserByKakaoWithDuplicateModel from 'src/model/auth/insertKakaoUserInfoModel';
import getUserInfoByKakaoModel from 'src/model/auth/getKakaoUserInfoModel';
import generateToken from 'src/utils/jwt/generateToken';
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
    
    async postTest1(body: postTest1RequestDto,res: Response): Promise<ResponseType> {
        let result = await redisClient.get(body.hi);
        let test = await getUserInfoByKakaoModel({kakaoUserId: "2844897955"})
        console.log(test);
        return generateResponse.SUCCESS({res,data: {result}});
    }

    async postTest2(body: postTest2RequestDto, res: Response): Promise<ResponseType> {
        let result = await getChatModel({chat_room_id: 0, limit: 30});
        console.log(result)
        return generateResponse.SUCCESS({res,data: result});
    }

    async getKakaoLogin(res: Response): Promise<void> {
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_image`;
        return res.redirect(kakaoAuthURL);
    }

    async getKakaoLogout(res: Response): Promise<void> {
        const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakao.clientID}&logout_redirect_uri=${kakao.logoutUri}`;
        return res.redirect(kakaoLogoutURL);
    }

    async postKakaoLoginVerify(body: postKakaoLoginVerifyRequestDto,res: Response): Promise<ResponseType> {
        let { code } = body;
        let tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token",{
            grant_type: 'authorization_code',
            client_id: kakao.clientID,
            client_secret: kakao.clientSecret,
            redirectUri: kakao.redirectUri,
            code: code
        },{
            headers: {
            'content-type': 'application/x-www-form-urlencoded'
            }
        });
        if(!tokenResponse){
            return generateResponse.INTERNAL_SERVER_ERROR({res,message: "카카오톡 서버에서 오류가 발생했습니다.\n다시 시도해주세요."});
        }
        let kakaoUserData = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`
            }
        });
        if(!kakaoUserData){
            return generateResponse.INTERNAL_SERVER_ERROR({res,message: "카카오톡 서버에서 오류가 발생했습니다.\n다시 시도해주세요."});
        }
        // insert user and oauth ( duplication check )
        await insertUserByKakaoWithDuplicateModel({kakaoUserId: kakaoUserData.data.id, kakaoUserProfileImage: kakaoUserData?.data?.properties?.profile_image});
        // //check user ( check user is inserted )
        let userInfo = await getUserInfoByKakaoModel({kakaoUserId: kakaoUserData.data.id});
        if(!userInfo || userInfo.length===0){
            return generateResponse.ENTITY_NOT_FOUND({res,message: "사용자를 찾을 수 없습니다."});
        }
        let token = generateToken(userInfo[0].user_id);
        return generateResponse.INTERNAL_SERVER_ERROR({res,message: "fucl"});
        return generateResponse.SUCCESS({res,data: {token,...userInfo[0]},dto: postKakaoLoginVerifyResponseDto});
    }





    









}
