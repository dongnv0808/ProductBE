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
    if (!product) throw new NotFoundException(`Không tìm thấy sp `)
    return product
  }

  async createProduct(payload: CreateProductDto) {
    try {
      const currentDay = dayjs(Date()).format("YYYY/MM/DD HH:mm:ss");
      const attId = await this.getProductById(payload.code)
      let product: CreateProductDto
      if (attId.length > 0) {
        return {
          message: 'Sản phẩm đã tồn tại!',
        };
      }
      else {
        if(!payload.code){
          return {
            message: "Code không được để trống!"
          }
        }
        product = {
          name: payload.name,
          code: payload.code,
          state: payload.state || "HN",
          status: payload.status || "a",
          is_deleted: 0
        }
        const query = `INSERT INTO [Products] (name, code, state, status,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${product.name}', '${product.code}', '${product.state}', '${product.status}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
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
      console.log('🚀️ ~ Create product error', err);
      return {
        message: "Thêm mới sản phẩm thất bại!"
      }
    }


  }
  async updateProduct(code: string, payload: UpdateProductDto) {
    const product = await this.getProductById(code)
    let newProduct: UpdateProductDto;
    const currentDay = dayjs(Date()).format("YYYY/MM/DD HH:mm:ss");
    if(!product[0].is_deleted){
      product[0].is_deleted = 0;
    } else {
      product[0].is_deleted = 1;
    }
    newProduct = {
      name: payload.name || product[0].name,
      state: payload.state || product[0].state,
      status: payload.status || product[0].status,
      is_deleted: payload.is_deleted || product[0].is_deleted
    }
    try {
      const query = `UPDATE products SET name='${newProduct.name}', state='${newProduct.state}', status='${newProduct.status}',is_deleted=${newProduct.is_deleted}, updated_date = '${currentDay}'  WHERE code = '${code}'`
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
