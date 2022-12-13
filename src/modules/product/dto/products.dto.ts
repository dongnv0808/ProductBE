import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    status: string;
    
    @IsNotEmpty()
    @IsNumber()
    is_deleted: number;
    
}