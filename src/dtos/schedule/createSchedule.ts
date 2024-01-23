import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class createScheduleRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    @IsNotEmpty()
    calendar_id: number
    @IsString()
    @IsNotEmpty()
    title: string    
    @IsString()
    description: string    
    @IsDateString()
    @IsNotEmpty()
    due_date: string
}

export class createScheduleResponseDto {
    @IsNotEmpty()
    newSchedule: {
        schedule_id: number
        user_id: number
        title: string
        description: string
        register_date: string
        update_date: string
        due_date: string
        calendar_id: number
        is_done: boolean
    }
}