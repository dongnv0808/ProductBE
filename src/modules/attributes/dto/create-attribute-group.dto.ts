
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateAttributeGrDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    code: string;
}
