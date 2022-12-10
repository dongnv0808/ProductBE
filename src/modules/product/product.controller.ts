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
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('/')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({
    summary: 'Get store qrcode',
  })
  @Get('')
  getProductSample() {
    return this.productService.getProduct();
  }
}
