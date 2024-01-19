import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class checkScheduleRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    @IsNotEmpty()
    schedule_id: number
    @IsNumber()
    @IsNotEmpty()
    user_id: number
}

export class checkScheduleResponseDto {
}