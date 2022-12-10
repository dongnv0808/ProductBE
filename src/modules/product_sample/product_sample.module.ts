import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSample } from './entities/product_sample.entity';
import { ProductSampleController } from './product_sample.controller';
import { ProductSampleService } from './product_sample.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSample], 'productDatasource'),
  ],
  controllers: [ProductSampleController],
  providers: [ProductSampleService],
  exports: [ProductSampleService],
})
export class ProductSampleModule {}
