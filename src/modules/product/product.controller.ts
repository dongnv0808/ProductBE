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
import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async showAllProduct(@Query() query: { offset: number, limit: number }) {
    return await this.productService.showAll(query.offset, query.limit);
  }

  @Get('/:code')
  async getProductByCode(@Param('code') code: string) {
    return await this.productService.getProductByCode(code);
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto
  ) {
    return await this.productService.createProduct(productDto);
  }
  
  @Put('/:code')
  async updateProduct(@Param('code') code: string, @Body() payload: UpdateProductDto) {
    return this.productService.updateProduct(code, payload);
  }
}
