import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateAttributeGrDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    is_deleted: number;
}