import { IsNotEmpty, IsString } from "class-validator";


export class AttributesDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsString()
    state: string;

    @IsString()
    status: string;

    @IsString()
    is_deleted: string;

    @IsString()
    created_date: Date;

    @IsString()
    updated_date: Date;

    @IsString()
    created_by: string;

    @IsString()
    updated_by: string;
}