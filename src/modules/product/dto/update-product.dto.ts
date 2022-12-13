import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    is_deleted: number;
}