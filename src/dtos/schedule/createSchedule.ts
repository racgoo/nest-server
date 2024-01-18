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
}