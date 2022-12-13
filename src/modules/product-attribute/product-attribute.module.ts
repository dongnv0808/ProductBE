import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAtb } from './entities/product.entity';
import { ProductAtbController } from './product-attribute.controller';
import { ProductAtbService } from './product-attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAtb], 'productDatasource'),
  ],
  controllers: [ProductAtbController],
  providers: [ProductAtbService],
  exports: [ProductAtbService],
})
export class ProductAtbModule {}
