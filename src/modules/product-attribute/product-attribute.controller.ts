import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {

  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductAtbDto } from './dto/create-product-attribute.dto';
import { UpdateProductAtbDto } from './dto/update-product-attribute.dto';
import { ProductAtbService } from './product-attribute.service';

@Controller('productAtb')
export class ProductAtbController {
  constructor(private readonly productAtbService: ProductAtbService) { }

  @Get()
  async showAllProductAtb(@Query() query: { offset: number, limit: number }) {
    return await this.productAtbService.showAll(query.offset, query.limit);
  }
  @Post()
  async createProductAtb(
    @Body() productDto: CreateProductAtbDto
  ) {
    return await this.productAtbService.createProductAtb(productDto);
  }
  // @Put('/:code')
  // async updateProductAtb(@Param('code') code: string, @Body() payload: UpdateProductAtbDto) {
  //   return this.productAtbService.updateProduct(code, payload);
  // }
}