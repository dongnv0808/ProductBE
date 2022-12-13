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
      if (productAtbList.length == 0) {
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
    const product = await this.productDatasource.query(`SELECT * FROM PRODUCT_ATTRIBUTES WHERE id = '${id}'`)
    if (!product) throw new NotFoundException(`Không tìm thấy thuộc tính `)
    return product
  }

  async createProductAtb(payload: CreateProductAtbDto) {
    try {
      const currentDay = dayjs(Date()).format("YYYY/MM/DD HH:mm:ss");
      const queryFindAtb = `SELECT * FROM ATTRIBUTES WHERE code='${payload.attribute_code}'`;
      const queryFindProduct = `SELECT * FROM PRODUCTS WHERE code='${payload.product_code}'`;
      const product = await this.productDatasource.query(queryFindProduct);
      const attribute = await this.productDatasource.query(queryFindAtb);

      const productAttribute = {
        attribute_id: attribute[0].id,
        attribute_name: attribute[0].name,
        attribute_code: payload.attribute_code,
        attribute_unit: payload.attribute_unit,
        attribute_value: payload.attribute_value,
        product_id: product[0].id,
        product_name: product[0].name,
        product_code: payload.product_code,
        is_deleted: payload.is_deleted,
      }
      const query = `INSERT INTO [Product_attributes] (attribute_id, attribute_name, attribute_code, attribute_unit, attribute_value, product_id, product_name, product_code, is_deleted,created_date, updated_date, created_by, updated_by) VALUES ('${productAttribute.attribute_id}', '${productAttribute.attribute_name}', '${productAttribute.attribute_code}', '${productAttribute.attribute_unit}', '${productAttribute.attribute_value}', '${productAttribute.product_id}', '${productAttribute.product_name}', '${productAttribute.product_code}', ${productAttribute.is_deleted},'${currentDay}', '${currentDay}', 0, 0)`;
      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Thêm mới sản phẩm thành công',
      };
    }
    catch (err) {
      console.log('🚀️ ~ err', err);
      return {
        message: 'Thêm mới thất bại!'
      }
    }
  }

  async updateProductAtb(id: number, payload: UpdateProductAtbDto) {
    const oldProductAtb = await this.getProductAtbById(id);
    try {
      let newProductAtb: ProductAtbDto;
      const currentDay = dayjs(Date()).format("YYYY/MM/DD HH:mm:ss");
      const queryFindAtb = `SELECT * FROM ATTRIBUTES WHERE code='${payload.attribute_code || oldProductAtb.attribute_code}'`;
      const queryFindProduct = `SELECT * FROM PRODUCTS WHERE code='${payload.product_code || oldProductAtb.product_code}'`;
      const product = await this.productDatasource.query(queryFindProduct);
      const attribute = await this.productDatasource.query(queryFindAtb);
      newProductAtb = {
        attribute_id: attribute[0].id,
        attribute_name: attribute[0].name,
        attribute_code: attribute[0].code,
        attribute_unit: payload.attribute_unit || oldProductAtb[0].attribute_unit,
        attribute_value: payload.attribute_value || oldProductAtb[0].attribute_value,
        product_id: product[0].id,
        product_name: product[0].name,
        product_code: product[0].code,
        is_deleted: payload.is_deleted || oldProductAtb[0].is_deleted,
      }
      const query = `UPDATE PRODUCT_ATTRIBUTES SET attribute_id=${newProductAtb.attribute_id}, attribute_name= '${newProductAtb.attribute_name}', attribute_code= '${newProductAtb.attribute_code}', attribute_unit= '${newProductAtb.attribute_unit}', attribute_value= ${newProductAtb.attribute_value}, product_id= ${newProductAtb.product_id}, product_name= '${newProductAtb.product_name}', product_code= '${newProductAtb.product_code}', is_deleted= '${newProductAtb.is_deleted}', updated_date= '${currentDay}' WHERE id = ${id}`
      await this.productDatasource.query(query)

      return {
        status: HttpStatus.OK,
        message: 'Update product success',
        newProductAtb
      }
    }
    catch (err) {
      console.log('🚀️ ~ Error update Product Attribute:', err);
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy thuộc tính sản phẩm!'
      }
    }
  }
}
