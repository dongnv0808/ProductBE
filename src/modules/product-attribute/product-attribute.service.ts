import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { trim, uniq } from 'lodash';
import { NotFoundError } from 'rxjs';
import { DataSource } from 'typeorm';
import { CreateProductAtbDto } from './dto/create-product-attribute.dto';
import { ProductAtbDto } from './dto/products-attribute.dto';
import { UpdateProductAtbDto } from './dto/update-product-attribute.dto';


@Injectable()
export class ProductAtbService {

  constructor(
    @InjectDataSource('productDatasource')
    private readonly productDatasource: DataSource,
    private readonly httpService: HttpService,
  ) {
  }

  async showAll(offset: number, limit: number) {
    let productAtbList: any[];
    try {
      const query = `SELECT * FROM product_attributes ps order by id DESC OFFSET ${offset} rows FETCH next ${limit} rows only`
      const products: ProductAtbDto[] = await this.productDatasource.query(query);
      productAtbList = products.map((att) => {
        return att
      })
      if(productAtbList.length == 0) {
        return {
          status: HttpStatus.OK,
          message: 'Không tìm thấy sản phẩm',
        }
      }
      return {
        status: HttpStatus.OK,
        message: 'Get all products success',
        productAtbList
      };
    }
    catch (err) {
      console.log(err)
    }

  }
  async getProductAtbById(id: number) {
    const product = await this.productDatasource.query(`SELECT * FROM PRODUCTS WHERE id = '${id}'`)
    if (!product) throw new NotFoundException(`Không tìm thấy thuộc tính `)
    return product
  }

  async createProductAtb(payload: CreateProductAtbDto) {
    try {
      const currentDay = dayjs(Date()).format("DD/MM/YYYY HH:mm:ss");
      const queryFindProductAtb = `SELECT * FROM PRODUCT_ATTRIBUTES WHERE product_code='${payload.product_code}'`;
      const queryFindAtb = `SELECT * FROM ATTRIBUTES WHERE code='${payload.attribute_code}'`;
      const queryFindProduct = `SELECT * FROM PRODUCTS WHERE code='${payload.product_code}'`;
      const product = await this.productDatasource.query(queryFindProduct);
      const attribute = await this.productDatasource.query(queryFindAtb);
      const oldProductAtb = await this.productDatasource.query(queryFindProductAtb);
      console.log('🚀️ ~ oldProductAtb', oldProductAtb);

      if (oldProductAtb.length > 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Sản phẩm đã tồn tại!',
        };
      }
      else {
        const query = `INSERT INTO [Product_attributes] (attribute_id, attribute_name, attribute_code, attribute_unit, attribute_value, product_id, product_name, product_code, is_deleted,created_date, updated_date, created_by, updated_by) VALUES ('${attribute[0].id}', '${attribute[0].name}', '${attribute[0].code}', '${payload.attribute_unit}', '${payload.attribute_value}', '${product[0].id}', '${product[0].name}', '${product[0].code}', 0,'${currentDay}', '${currentDay}', 0, 0)`;
        await this.productDatasource.query(query);
        // const result = await this.getProductAtbById(payload.attribute_code);
        return {
          status: HttpStatus.OK,
          message: 'Thêm mới sản phẩm thành công',
          // result
        };
      }
    }
    catch (err) {
      console.log(err)
    }


  }
  // async updateProduct(code: string, payload: UpdateProductAtbDto) {
  //   const product = await this.getProductAtbById(code)
  //   let newProduct = {}
  //   if (!product) throw new NotFoundException(`Không tìm thấy thuộc tính `);
  //   const currentDay = dayjs(Date()).format("DD/MM/YYYY HH:mm:ss");
  //   if (payload.name == "") {
  //     payload.name = product.name
  //   }

  //   if (payload.state == "") {
  //     payload.state = product.state
  //   }
  //   if (payload.status == "") {
  //     payload.state = product.state
  //   }
  //   try {
  //     const query = `UPDATE products SET name ='${payload.name}', state='${payload.state}', status='${payload.status}',is_deleted = '${payload.is_deleted}', updated_date = '${currentDay}'  WHERE code = '${product[0].code}'`
  //     await this.productDatasource.query(query)
  //     newProduct = await this.getProductAtbById(code);
  //     return {
  //       status: HttpStatus.OK,
  //       message: 'Update product success',
  //       newProduct
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
}
