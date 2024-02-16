import { updateExpoPushTokenResponseDto } from './../../dtos/user/updateExpoPushToken';
import { postTest1RequestDto } from '../../dtos/auth/postTest1';
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
import insertRefreshTokenModel from 'src/model/auth/insertRefreshTokenModel';
import { authByRefreshTokenRequestDto, authByRefreshTokenResponseDto } from 'src/dtos/auth/authByRefreshToken';
import insertRefreshTokenForceModel from 'src/model/auth/insertRefreshTokenForce';
import { updateExpoPushTokenRequestDto } from 'src/dtos/user/updateExpoPushToken';
import updateExpoPushTokenModel from 'src/model/user/updateExpoPushTokenModel';


@Injectable()
export class UserService {

    async updateExpoPushToken(body: updateExpoPushTokenRequestDto, res: Response): Promise<ResponseType> {

        if(!body.user_id)return generateResponse.ACCESS_DENIED({res});
        if(body.expo_push_token==="")return generateResponse.BAD_REQUEST({res,message: "오류가 발생했습니다."});

        let result = await updateExpoPushTokenModel({user_id: body.user_id,expo_push_token: body.expo_push_token});
        if(result.updatedRows>0)return generateResponse.SUCCESS({res,dto: updateExpoPushTokenResponseDto});
        else return generateResponse.INTERNAL_SERVER_ERROR({res,message: "오류가 발생했습니다."});  
    }

    // async kakaoLogin(res: Response): Promise<void> {
    //     const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_image`;
    //     return res.redirect(kakaoAuthURL);
    // }

    // async kakaoLogout(res: Response): Promise<void> {
    //     const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakao.clientID}&logout_redirect_uri=${kakao.logoutUri}`;
    //     return res.redirect(kakaoLogoutURL);
    // }

    // async kakaoLoginVerify(body: kakaoLoginVerifyRequestDto,res: Response): Promise<ResponseType> {
    //     let { code } = body;
    //     let tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token",{
    //         grant_type: 'authorization_code',
    //         client_id: kakao.clientID,
    //         client_secret: kakao.clientSecret,
    //         redirectUri: kakao.redirectUri,
    //         code: code
    //     },{
    //         headers: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //         }
    //     });
    //     if(!tokenResponse){
    //         return generateResponse.INTERNAL_SERVER_ERROR({res,message: "카카오톡 서버에서 오류가 발생했습니다.\n다시 시도해주세요."});
    //     }
    //     let kakaoUserData = await axios({
    //         method: 'get',
    //         url: 'https://kapi.kakao.com/v2/user/me',
    //         headers: {
    //             Authorization: `Bearer ${tokenResponse.data.access_token}`
    //         }
    //     });
    //     if(!kakaoUserData){
    //         return generateResponse.INTERNAL_SERVER_ERROR({res,message: "카카오톡 서버에서 오류가 발생했습니다.\n다시 시도해주세요."});
    //     }
    //     // insert user and oauth ( duplication check )
    //     await insertUserByKakaoWithDuplicateModel({kakaoUserId: kakaoUserData.data.id, kakaoUserProfileImage: kakaoUserData?.data?.properties?.profile_image});
    //     // //check user ( check user is inserted )
    //     let userInfo = await getUserInfoByKakaoModel({kakaoUserId: kakaoUserData.data.id});
    //     if(!userInfo || userInfo.length===0){
    //         return generateResponse.ENTITY_NOT_FOUND({res,message: "사용자를 찾을 수 없습니다."});
    //     }
    //     let { refresh_token, access_token } = generateToken(userInfo[0].user_id);
    //     //set refresh token
    //     await insertRefreshTokenForceModel({new_refresh_token: refresh_token, user_id: userInfo[0].user_id});
    //     return generateResponse.SUCCESS({res,data: {refresh_token, access_token,...userInfo[0]},dto: kakaoLoginVerifyResponseDto});
    // }





    









}
