import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attributes';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeGrDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGrDto } from './dto/update-attribute-group.dto';
import { CreateAttributeAtbGrDto } from './dto/attribute-attribute-group.dto';
import { UpdateAttributeAtbGrDto } from './dto/update-attribute-atbGr.dto';

@Controller('attributes')
export class AttributesController {
    constructor(
        private _attributesService: AttributesService
    ){}
    @Get()
    async showAllAttributes(@Query() query:{offset:number, limit: number}) {
        return  await this._attributesService.showAllAttributes(query.offset,query.limit);
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
    @Get('group')
    async showAllAttributeGr(@Query() query:{offset:number, limit: number}) {
        return  await this._attributesService.showAllAttGr(query.offset,query.limit);
    }

    @Post('group')
    async createAttributeGr(
        @Body() attributeGroup: CreateAttributeGrDto
    ) {
        return await this._attributesService.createAttributeGr(attributeGroup);
    }
    @Put('group/:code')
    async updateAttributeGr(@Param('code') code:string, @Body() payload : UpdateAttributeGrDto) {
        return this._attributesService.updateAttributeGr(code, payload);
    }
    @Post('group-atb')
    async createAtbAtbGr(@Body() payload : CreateAttributeAtbGrDto){
        return this._attributesService.createAtbAtbGr(payload)
    }
    @Put('group-atb/:id')
    async updateAtbAtbGr(@Param('id') id:number,@Body() payload : UpdateAttributeAtbGrDto) {
        return this._attributesService.updateAtbAtbGr(id,payload)
    }
}   
