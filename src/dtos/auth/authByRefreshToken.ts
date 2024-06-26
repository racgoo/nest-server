import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class authByRefreshTokenRequestDto extends PartialType(defaultRequestDto) {

}

export class authByRefreshTokenResponseDto {

    @IsString()
    access_token: string

    @IsString()
    refresh_token: string

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