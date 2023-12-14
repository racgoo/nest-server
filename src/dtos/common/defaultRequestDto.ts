import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class defaultRequestDto  {
    @IsString()
    public access_token: string | null;
    @IsString()
    public refresh_token: string | null;
    @IsNumber()
    public user_id: number | null;
}

