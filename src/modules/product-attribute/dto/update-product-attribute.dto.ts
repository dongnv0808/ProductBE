import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateProductAtbDto {
    @IsOptional()
    @IsString()
    attribute_code: string;

    @IsOptional()
    @IsString()
    attribute_unit: string;

    @IsOptional()
    @IsNumber()
    attribute_value: number;

    @IsOptional()
    @IsString()
    product_code: string;

    @IsOptional()
    @IsString()
    is_deleted: number;
}