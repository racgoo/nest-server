import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString  } from "class-validator";
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

    @IsNumber()
    interval_num: number

    @IsOptional()
    interval_due_date: string

    @IsString()
    @IsOptional()
    place: string

    @IsString()
    repeat_type: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

    @IsString()
    weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${
    | '0'
    | '1'}${'0' | '1'}${'0' | '1'}`;

    @IsNumber()
    calendar_label_id: number;

}

export class createScheduleResponseDto {
    @IsNotEmpty()
    newSchedule: scheduleType
}