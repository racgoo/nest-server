import { IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class getScheduleRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    @IsOptional()
    calendar_id: number | null | undefined
    @IsDateString()
    @IsOptional()
    target_date: string | null | undefined
}

export class getScheduleResponseDto {
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