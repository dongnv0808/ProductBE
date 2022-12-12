
import { IsNotEmpty , IsString} from 'class-validator';

export class CreateProductAtbDto {
    @IsNotEmpty()
    @IsString()
    id: number;

    @IsNotEmpty()
    @IsString()
    attribute_id: number;

    @IsNotEmpty()
    @IsString()
    attribute_name: string;

    @IsNotEmpty()
    @IsString()
    attribute_code: string;

    @IsNotEmpty()
    @IsString()
    attribute_unit: string;

    @IsNotEmpty()
    @IsString()
    attribute_value: number;

    @IsNotEmpty()
    @IsString()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsNotEmpty()
    @IsString()
    product_code: string;
    
    @IsNotEmpty()
    @IsString()
    created_date: string;
}