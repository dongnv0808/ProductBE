import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AttributesService } from './attributes.service';

@Controller('attributes')
export class AttributesController {
    constructor(
        private _attributesService: AttributesService
    ){}
    @Get()
    async showAllAttributes(@Query() query:{offset:number, limit: number}) {
        const attributes = await this._attributesService.showAll(query.offset,query.limit);
        return {
            statusCode: HttpStatus.OK,
            message:"attributes successfully",
            attributes
        }
    }

}   
