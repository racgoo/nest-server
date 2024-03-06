import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class saveCalendarLabelListRequestDto extends PartialType(defaultRequestDto) {
    // @IsNumber()
    // @IsNotEmpty()
    // calendar_id: number;
    // @IsString()
    // color: number;
    // @IsString()
    // name: number;
    @IsArray()
    labelList: labelType[]
}

export class saveCalendarLabelListResponseDto {
    // calendarList: {
    //     user_id: number
    //     calendar_id: number
    //     title: string
    //     description: string
    //     register_date: string
    //     update_date: string
    // }[]
}