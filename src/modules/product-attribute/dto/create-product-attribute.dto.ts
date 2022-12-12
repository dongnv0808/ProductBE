
import { IsNotEmpty , IsString} from 'class-validator';

export class CreateProductAtbDto {
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
    product_code: string;
}