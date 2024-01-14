import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class deleteCalenderRequestDto extends PartialType(defaultRequestDto) {
    @IsNumber()
    @IsNotEmpty()
    calendar_id: number;
}

export class deleteCalenderResponseDto {
}