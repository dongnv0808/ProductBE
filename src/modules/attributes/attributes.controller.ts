import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attributes';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attributes')
export class AttributesController {
    constructor(
        private _attributesService: AttributesService
    ){}
    @Get()
    async showAllAttributes(@Query() query:{offset:number, limit: number}) {
        return  await this._attributesService.showAll(query.offset,query.limit);
    }
    @Post()
    async createAttribute(
        @Body() attributeDto : CreateAttributeDto
    ) {
      
        return await this._attributesService.createAttribute(attributeDto);
    }
    @Put('/:code')
    async updateAttribute(@Param('code') code:string, @Body() payload : UpdateAttributeDto) {
        return this._attributesService.updateAttribute(code, payload);
    }
}   
