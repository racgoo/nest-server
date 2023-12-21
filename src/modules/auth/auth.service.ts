import { postTest1RequestDto } from './../../dtos/auth/postTest1';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { postTest2RequestDto } from 'src/dtos/auth/postTest2';
import getChatModel from 'src/model/chat/getChatModel';
import generateResponse from 'src/utils/reponse/generateResponse';
import { ResponseType } from 'src/utils/reponse/generateResponse';
import { kakaoLoginVerifyRequestDto, kakaoLoginVerifyResponseDto } from 'src/dtos/auth/kakaoLoginVerify';
import QueryString from "qs";
import axios from "axios";
import insertUserByKakaoWithDuplicateModel from 'src/model/auth/insertKakaoUserInfoModel';
import getUserInfoByKakaoModel from 'src/model/auth/getKakaoUserInfoModel';
import generateToken from 'src/utils/jwt/generateToken';

import verifyToken from 'src/utils/jwt/verifyToken';
import getUserInfoByUserIdModel from 'src/model/auth/getUserInfoByUserIdModel';
import insertRefreshTokenModel from 'src/model/auth/insertRefreshToken';
import { authByRefreshTokenRequestDto, authByRefreshTokenResponseDto } from 'src/dtos/auth/authByRefreshToken';
import insertRefreshTokenForceModel from 'src/model/auth/insertRefreshTokenForce';
const kakao = {
    clientID: process.env.KAKAO_REST_API,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri: process.env.KAKAO_REDIRECT_URI_DEV,
    logoutUri:  process.env.KAKAO_LOGOUT_URI_DEV
};

@Injectable()
export class AuthService {
    async authByRefreshToken(body: authByRefreshTokenRequestDto, res: Response): Promise<ResponseType> {
        let verfifiedData = verifyToken(body.refresh_token,"refresh",res);
        if(verfifiedData.user_id===-1)return; //verfifiedData 여기서 처리하고 res.send까지 해줌. ㄱ
        let { access_token, refresh_token } = generateToken(verfifiedData.user_id);
        let result = await insertRefreshTokenModel({user_id: verfifiedData.user_id, current_refresh_token: body.refresh_token, new_refresh_token: refresh_token});
        if(result.affectedRows!==0){
            let [userInfo] = await getUserInfoByUserIdModel({user_id: verfifiedData.user_id});
            return generateResponse.SUCCESS({res,data: {...userInfo,access_token,refresh_token},dto:  authByRefreshTokenResponseDto});
        }else{
            return generateResponse.ACCESS_DENIED({res});
        }
    }

    async kakaoLogin(res: Response): Promise<void> {
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_image`;
        return res.redirect(kakaoAuthURL);
    }

    async kakaoLogout(res: Response): Promise<void> {
        const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakao.clientID}&logout_redirect_uri=${kakao.logoutUri}`;
        return res.redirect(kakaoLogoutURL);
    }

    async kakaoLoginVerify(body: kakaoLoginVerifyRequestDto,res: Response): Promise<ResponseType> {
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
        console.log(userInfo)
        if(!userInfo || userInfo.length===0){
            return generateResponse.ENTITY_NOT_FOUND({res,message: "사용자를 찾을 수 없습니다."});
        }
        let { refresh_token, access_token } = generateToken(userInfo[0].user_id);
        //set refresh token
        await insertRefreshTokenForceModel({new_refresh_token: refresh_token, user_id: userInfo[0].user_id});
        return generateResponse.SUCCESS({res,data: {refresh_token, access_token,...userInfo[0]},dto: kakaoLoginVerifyResponseDto});
    }





    









}
