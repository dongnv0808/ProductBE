
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
export class UpdateAttributeAtbGrDto {
  
    @IsNumber()
    attribute_id: number;

    @IsString()
    attribute_name:string;

    @IsString()
    attribute_code:string;

    @IsString()
    attribute_group_id:string;

    @IsString()
    attribute_group_name:string;

    @IsString()
    attribute_group_code:string;

    @IsNumber()
    is_deleted: number;
}