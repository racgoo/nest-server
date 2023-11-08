import { IsNotEmpty, IsNumber, IsString  } from "class-validator";
export class postTest1RequestDto {
    @IsNotEmpty()
    @IsString()
    public hi: string;
    @IsString()
    public bye: string;
}

export class postTest1ResponseDto {
    @IsNotEmpty()
    @IsString()
    public hi: string;
    @IsString()
    public bye: string;
}