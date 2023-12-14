import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { getUserInfoByKakaoModelReturnType } from "src/model/auth/getKakaoUserInfoModel";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class healthCheckRequestDto extends PartialType(defaultRequestDto) {
    @IsString()
    dummy?: string
}

export class healthCheckResponseDto {
    @IsString()
    dummy?: string
}