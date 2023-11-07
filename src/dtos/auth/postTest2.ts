import { IsNotEmpty, IsNumber, IsString  } from "class-validator";
export class postTest2RequestDto {
    @IsNotEmpty()
    @IsString()
    public hi: string;
    @IsString()
    public bye: string;
}

export class postTest2ResponseDto {
    @IsString()
    public hi: string;
    @IsString()
    public bye: string;
}