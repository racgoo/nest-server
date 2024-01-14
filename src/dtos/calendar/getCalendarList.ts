import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class getCalendarListRequestDto extends PartialType(defaultRequestDto) {

}

export class getCalendarListResponseDto {
    calendarList: {
        user_id: number
        calendar_id: number
        title: string
        description: string
        register_date: string
        update_date: string
    }[]
}