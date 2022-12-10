import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AttributesEntity } from './entities/attributes.entities';

@Injectable()
export class AttributesService {
    constructor (
        @InjectDataSource('productDatasource')
        private readonly productDatasource: DataSource
    ){}
    async showAll(offset:number, limit:number) {
        const query = `SELECT 
        code, attribute, id 
        FROM ProductSample ps 
        order by id DESC 
        OFFSET ${offset} rows
        FETCH next ${limit} rows only`
        return await this.productDatasource.query(query)
    }

}
