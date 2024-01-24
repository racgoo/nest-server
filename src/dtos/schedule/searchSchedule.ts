import { IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class searchScheduleRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    calendar_id: number
    @IsString()
    title: string
}

export class searchScheduleResponseDto {
    scheduleList: scheduleType[]
}