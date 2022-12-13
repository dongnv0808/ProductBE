import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { trim, uniq } from 'lodash';
import { NotFoundError } from 'rxjs';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product';
import { ProductDto } from './dto/products.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {

  constructor(
    @InjectDataSource('productDatasource')
    private readonly productDatasource: DataSource,
    private readonly httpService: HttpService,
  ) {
  }

  async showAll(offset: number, limit: number) {
    let productList: any[];
    try {
      const query = `SELECT 
    id,name, code, is_deleted, created_date, updated_date
    FROM products ps 
    order by id DESC 
    OFFSET ${offset} rows
    FETCH next ${limit} rows only`
      const products: ProductDto[] = await this.productDatasource.query(query);
      productList = products.map((att) => {
        return att
      })
      return {
        status: HttpStatus.OK,
        message: 'Get all products success',
        productList
      };
    }
    catch (err) {
      console.log(err)
    }

  }
  async getProductById(code: string) {
    const product = await this.productDatasource.query(`SELECT * FROM PRODUCTS WHERE code = '${code}'`)
    if (!product) throw new NotFoundException(`Không tìm thấy thuộc tính `)
    return product
  }

  async createProduct(payload: CreateProductDto) {
    try {
      const currentDay = dayjs(Date()).format("DD/MM/YYYY HH:mm:ss");
      const attId = await this.getProductById(payload.code)
      console.log('🚀️ ~ attId', attId);

      if (attId.length > 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Sản phẩm đã tồn tại!',
        };
      }
      else {
        if (payload.state == "") {
          payload.state = "HN"
        }
        if (payload.status == "") {
          payload.status = "Còn hàng"
        }
        const query = `INSERT INTO [Products] (name, code, state, status,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${payload.name}', '${payload.code}', '${payload.state}', '${payload.status}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
        await this.productDatasource.query(query);
        const result = await this.getProductById(payload.code);
        return {
          status: HttpStatus.OK,
          message: 'Thêm mới sản phẩm thành công',
          result
        };
      }
    }
    catch (err) {
      console.log(err)
    }


  }
  async updateProduct(code: string, payload: UpdateProductDto) {
    const product = await this.getProductById(code)
    let newProduct: ProductDto;
    console.log(product)
    if (!product) throw new NotFoundException(`Không tìm thấy sp `);
    const currentDay = dayjs(Date()).format("YYYY/MM/DD HH:mm:ss");
    newProduct = {
      name: payload.name || product.name,
      code: code,
      state: payload.state || product.state,
      status: payload.status || product.status,
      is_deleted: payload.is_deleted || product.is_deleted
    }

    try {
      const query = `UPDATE products SET name='${newProduct.name}', state='${newProduct.state}', status='${newProduct.status}',is_deleted = ${newProduct.is_deleted}, updated_date = '${currentDay}'  WHERE code = '${product.code}'`
      await this.productDatasource.query(query)
      newProduct = await this.getProductById(code);
      return {
        status: HttpStatus.OK,
        message: 'Update product success',
        newProduct
      }
    }
    catch (err) {
      console.log(err)
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy sản phẩm!'
      }
    }
  }
}
