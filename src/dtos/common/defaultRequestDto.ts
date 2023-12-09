import { IsNotEmpty, IsString } from "class-validator";

export class defaultRequestDto  {
    @IsString()
    public token: string | null;
    @IsString()
    public user_id: number | null;
}