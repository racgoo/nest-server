import { IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class getAllScheduleForSearchRequestDto extends PartialType(defaultRequestDto) {

}

export class getAllScheduleForSearchResponseDto {
    scheduleList: scheduleType[]
}