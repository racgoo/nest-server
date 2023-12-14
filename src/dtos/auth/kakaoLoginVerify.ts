import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { getUserInfoByKakaoModelReturnType } from "src/model/auth/getKakaoUserInfoModel";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class kakaoLoginVerifyRequestDto extends PartialType(defaultRequestDto) {
    @IsNotEmpty()
    @IsString()
    public code: string;
}

export class kakaoLoginVerifyResponseDto {

    @IsString()
    access_token: string | null;
    
    @IsString()
    refresh_token: string | null;

    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    @IsEmail()
    e_mail: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    nickname: string

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string

    @IsNotEmpty()
    @IsString()
    platform: string

    @IsNotEmpty()
    @IsDateString()
    update_date: string

    @IsNotEmpty()
    @IsDateString()
    register_date: string
}