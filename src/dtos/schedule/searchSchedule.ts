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
    scheduleList: {
        schedule_id: number
        user_id: number
        title: string
        description: string
        register_date: string
        update_date: string
        due_date: string
        calendar_id: number
        is_done: boolean
    }[]
}