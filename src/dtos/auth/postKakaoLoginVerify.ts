import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { getUserInfoByKakaoModelReturnType } from "src/model/auth/getKakaoUserInfoModel";
export class postKakaoLoginVerifyRequestDto {
    @IsNotEmpty()
    @IsString()
    public code: string;
}

export class postKakaoLoginVerifyResponseDto {

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