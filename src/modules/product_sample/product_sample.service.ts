import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Response } from 'express';
import { trim, uniq } from 'lodash';
import { DataSource } from 'typeorm';


@Injectable()
export class ProductSampleService {

  constructor(
    @InjectDataSource('productDatasource')
    private readonly productDatasource: DataSource,
  ) {
  }

  async getProductSample(offset: number, limit: number): Promise<any[]> {
    let productSample: any[];
    try {
      // const dateNow = dayjs().tz(tz).format('YYYY-MM-DD');
      const query = `SELECT code, attribute, id FROM ProductSample ps order by id OFFSET ${offset} rows FETCH next ${limit} rows only`;
      const resp: any[] = await this.productDatasource.query(query)
      productSample = resp.map((e) => {
        return e
      })
      return productSample;

    } catch (error) {
      const message = error?.response?.data ?? error?.response ?? error;
      console.log('🚀️ ~ error getProductSample', message);
      productSample = [];
    }

    return productSample;
  }
}
