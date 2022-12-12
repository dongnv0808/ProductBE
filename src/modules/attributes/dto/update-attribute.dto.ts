import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateAttribute {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    is_deleted: number;
}