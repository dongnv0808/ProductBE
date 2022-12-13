
import { IsNotEmpty, IsNumberString } from 'class-validator';
export class ListProductAtbDto {
    @IsNotEmpty()
    @IsNumberString()
    page: string;

    @IsNotEmpty()
    @IsNumberString()
    pageSize: string;
}