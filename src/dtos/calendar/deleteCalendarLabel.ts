
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from "class-validator";
import { defaultRequestDto } from "../common/defaultRequestDto";
import { PartialType } from "@nestjs/mapped-types";

export class deleteCalendarLabelRequestDto extends PartialType(defaultRequestDto) {
    @IsNotEmpty()
    label: labelType;
}

export class deleteCalendarLabelResponseDto {
}