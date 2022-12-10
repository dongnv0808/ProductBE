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
import { ProductSampleService } from './product_sample.service';

@ApiTags('productspl')
@Controller('/')
export class ProductSampleController {
  constructor(private readonly productSampleService: ProductSampleService) {}

  @Get('test')
  getProductSample() {
    console.log('🚀️ ~ 123', 123);
    return this.productSampleService.getProductSample();
  }
}
