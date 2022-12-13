
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class AttributeGroupDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsString()
    is_deleted: string;

    @IsString()
    created_date: string;

    @IsString()
    updated_date: string;

    @IsString()
    created_by: string;

    @IsString()
    updated_by: string;
}
