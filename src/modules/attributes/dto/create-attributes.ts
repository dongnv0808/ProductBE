
import { IsNotEmpty , IsString} from 'class-validator';

export class CreateAttributeDto {
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