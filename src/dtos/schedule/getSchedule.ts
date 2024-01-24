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
    scheduleList: scheduleType[]
}