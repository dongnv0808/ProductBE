
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateAttributeAtbGrDto{
    @IsString()
    attribute_code: string;

    @IsString()
    attribute_group_code: string;

}
