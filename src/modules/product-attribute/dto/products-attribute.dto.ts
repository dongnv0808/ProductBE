import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductAtbDto {
    @IsNotEmpty()
    @IsNumber()
    attribute_id: number;
    
    @IsNotEmpty()
    @IsString()
    attribute_name: string;

    @IsNotEmpty()
    @IsString()
    attribute_code: string;

    @IsNotEmpty()
    @IsNumber()
    attribute_unit: number;
    
    @IsNotEmpty()
    @IsString()
    attribute_value: string;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    product_name: string;
    
    @IsNotEmpty()
    @IsString()
    product_code: string;


    @IsNotEmpty()
    @IsNumber()
    is_deleted: number;
}