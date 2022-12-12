import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AttributesDto } from './dto/attributes.dto';
import * as dayjs from 'dayjs';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeDto } from './dto/create-attributes';
import { CreateAttributeGrDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGrDto } from './dto/update-attribute-group.dto';
import { CreateAttributeAtbGrDto } from './dto/attribute-attribute-group.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectDataSource('productDatasource')
    private readonly productDatasource: DataSource,
  ) {}

  async showAll(offset: number, limit: number) {
    let attributeList: any[];
    try {
      const query = `SELECT 
        id,name, code, is_deleted, created_date, updated_date
        FROM Attributes ps 
        order by id DESC 
        OFFSET ${offset} rows
        FETCH next ${limit} rows only`;
      const attributes: AttributesDto[] = await this.productDatasource.query(
        query,
      );

      attributeList = attributes.map((att) => {
        return att;
      });
      return {
        status: HttpStatus.OK,
        message: 'Get all attributes success',
        attributeList,
      };
    } catch (err) {
      console.log(err);
    }
  }
  async getAttributeById(code: string) {
    const attribute = await this.productDatasource.query(
      `SELECT * FROM Attributes WHERE code = '${code}'`,
    );
    if (!attribute) throw new NotFoundException(`Không tìm thấy thuộc tính `);
    return attribute;
  }

  async createAttribute(payload: CreateAttributeDto) {
    try {
      const currentDay = dayjs(Date()).format('DD/MM/YYYY HH:mm:ss');
      const attId = await this.getAttributeById(payload.code);

      if (attId.length > 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: ' Attribute already exist',
        };
      } else {
        const query = `INSERT INTO [Attributes] (name, code,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${payload.name}', '${payload.code}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
        const attribute = await this.productDatasource.query(query);
        return {
          status: HttpStatus.OK,
          message: 'Create attribute success',
          attribute,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateAttribute(code: string, payload: UpdateAttributeDto) {
    const atb = await this.getAttributeById(code);
    if (!atb) throw new NotFoundException(`Không tìm thấy thuộc tính `);
    const currentDay = dayjs(Date()).format('DD/MM/YYYY HH:mm:ss');
    if (payload.name == '') {
      payload.name = atb.name;
    }
    try {
      const query = `UPDATE Attributes SET name ='${payload.name}', is_deleted = '${payload.is_deleted}', updated_date = '${currentDay}'  WHERE code = '${atb[0].code}'`;
      const newAttribute = await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Update attribute success',
      };
    } catch (err) {
      console.log(err);
    }
    
  }


  async findAttributeGroup(code: string) {
    const attribute = await this.productDatasource.query(
      `SELECT * FROM Attribute_groups WHERE code = '${code}'`,
    );
    if (!attribute) throw new NotFoundException(`Không tìm thấy nhóm thuộc tính `);
    return attribute;
  }
  async createAttributeGr(payload: CreateAttributeGrDto) {
    try {
      const currentDay = dayjs(Date()).format('DD/MM/YYYY HH:mm:ss');
      const attGrId = await this.getAttributeById(payload.code);

      if (attGrId.length > 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: ' Attribute Group already exist',
        };
      } else {
        const query = `INSERT INTO [Attribute_groups] (name, code,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${payload.name}', '${payload.code}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
        await this.productDatasource.query(query);
        return {
          status: HttpStatus.OK,
          message: 'Create attribute group success',
         
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateAttributeGr(code: string, payload: UpdateAttributeGrDto) {
      const atb_gr = await this.findAttributeGroup(code);


    if (!atb_gr) throw new NotFoundException(`Không tìm nhóm thấy thuộc tính `);
    const currentDay = dayjs(Date()).format('DD/MM/YYYY HH:mm:ss');
    if (payload.name == '') {
      payload.name = atb_gr.name;
    }
    try {
      const query = `UPDATE Attribute_groups SET name ='${payload.name}', is_deleted = '${payload.is_deleted}', updated_date = '${currentDay}'  WHERE code = '${atb_gr[0].code}'`;
      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Update attribute success',
      };
    } catch (err) {
      console.log(err);
    }
    
  }

  async createAtbGroups(payload: CreateAttributeAtbGrDto){ 
    const currentDay = dayjs(Date()).format('DD/MM/YYYY HH:mm:ss');
    const atbGroup = await this.findAttributeGroup(payload.attribute_group_code)
    
    const atb = await this.getAttributeById(payload.attribute_code)

    try{
      if(atbGroup.length < 0)  throw new NotFoundException(`Không tìm thấy nhóm thuộc tính `)
      if(atb.length < 0)  throw new NotFoundException(`Không tìm thấy thuộc tính `)
        const query = `INSERT INTO [Attribute_attribute_groups] (attribute_id,attribute_name, attribute_code,attribute_group_id,attribute_group_name,attribute_group_code, created_date, updated_date, created_by, updated_by) VALUES (${atb[0].id},'${atb[0].name}', '${atb[0].code}',${atbGroup[0].id},'${atbGroup[0].name}','${atbGroup[0].code}', '${currentDay}', '${currentDay}', 0, 0)`
      await this.productDatasource.query(query)
        return {
            status: HttpStatus.OK,
            message: 'Create attribute group success',
          };
    }
    catch (err) {
        console.log(err);
      }
      
  }
 
  
  
}
