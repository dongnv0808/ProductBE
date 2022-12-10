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
import PaginationParams from '../pagination/paginationParams';
import { ProductSampleService } from './product_sample.service';

@ApiTags('productspl')
@Controller('/')
export class ProductSampleController {
  constructor(private readonly productSampleService: ProductSampleService) {}

  @Get('getProductSample')
  getProductSample(@Query() query: PaginationParams) {
    console.log('🚀️ ~ ', query.offset, query.limit);
    return this.productSampleService.getProductSample(query.offset, query.limit);
  }
}
