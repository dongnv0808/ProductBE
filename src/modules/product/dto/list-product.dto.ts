
import { IsNotEmpty, IsNumberString } from 'class-validator';
export class ListAttributeDto {
    @IsNotEmpty()
    @IsNumberString()
    page: string;

    @IsNotEmpty()
    @IsNumberString()
    pageSize: string;
}