
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateAttributeGrDto{
    @IsString()

    attribute_id: string;

    @IsNotEmpty()
    @IsString()
    attribute_name: string;
    
    @IsString()
    attribute_code: string;

    @IsString()
    attribute_group_id: string;

    @IsString()
    attribute_group_name: string;

    @IsString()
    attribute_group_code: string;

}
