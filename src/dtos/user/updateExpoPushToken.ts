import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class updateExpoPushTokenRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
    @IsString()
    @IsNotEmpty()
    expo_push_token: string
}

export class updateExpoPushTokenResponseDto {
}