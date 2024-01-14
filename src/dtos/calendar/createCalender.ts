import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class createCalenderRequestDto extends PartialType(defaultRequestDto) {
    @IsString()
    @IsNotEmpty()
    calendarName: string
}

export class createCalenderResponseDto {
}