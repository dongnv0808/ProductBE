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
    private readonly httpService: HttpService,
  ) {
  }

  async getProductSample(): Promise<[]> {
    let productSample: [];
    try {
      // const dateNow = dayjs().tz(tz).format('YYYY-MM-DD');
      const query = `SELECT * FROM ProductSample`;

      const resp: { employee_code: string }[] = await this.productDatasource.query(
        query,
      );

      productSample = uniq(resp.map((e) => e.employee_code));
    } catch (error) {
      const message = error?.response?.data ?? error?.response ?? error;
      console.log('🚀️ ~ error getUserWorkshiftInDay', message);

      productSample = [];
    }

    return productSample;
  }
}
