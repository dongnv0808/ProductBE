import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributesEntity } from './entities/attributes.entities';

import { Product } from '../product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Product],'productDatasource')],
  controllers: [AttributesController],
  providers: [AttributesService]
})
export class AttributesModule {}
