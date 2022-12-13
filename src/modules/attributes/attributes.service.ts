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
import { AttributeGroupDto } from './dto/attribute-group.dto';
import { UpdateAttributeAtbGrDto } from './dto/update-attribute-atbGr.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectDataSource('productDatasource')
    private readonly productDatasource: DataSource,
  ) {}

  async showAllAttributes(offset: number, limit: number) {
    let attributeGrList: any[];
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

      attributeGrList = attributes.map((att) => {
        return att;
      });
      return {
        status: HttpStatus.OK,
        message: 'Get all attributes success',
        attributeGrList,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findAttribute(code: string) {
    const attribute = await this.productDatasource.query(
      `SELECT * FROM Attributes WHERE code = '${code}'`,
    );
    if (!attribute) throw new NotFoundException(`Attribute not found `);
    return attribute[0];
  }

  async createAttribute(payload: CreateAttributeDto) {
    try {
      const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');
      const attId = await this.findAttribute(payload.code);

      if (attId) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: ' Attribute already exist',
        };
      } else {
        const query = `INSERT INTO [Attributes] (name, code,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${payload.name}', '${payload.code}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
        await this.productDatasource.query(query);
        return {
          status: HttpStatus.OK,
          message: 'Create attribute success',
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateAttribute(code: string, payload: UpdateAttributeDto) {
    const atb = await this.findAttribute(code);
    if (!atb) throw new NotFoundException(`Attribute not found `);
    const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');
    if (payload.name == '' || payload.name == undefined) {
      payload.name = atb.name;
    }

    try {
      const query = `UPDATE Attributes SET name ='${payload.name}', is_deleted = '${payload.is_deleted}', updated_date = '${currentDay}'  WHERE code = '${atb.code}'`;
      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Update attribute success',
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findAttributeGroup(code: string) {
    const attributeGr = await this.productDatasource.query(
      `SELECT * FROM Attribute_groups WHERE code = '${code}'`,
    );
    if (!attributeGr)
      throw new NotFoundException(`attribute group not found `);
    return attributeGr[0];
  }

  async showAllAttGr(offset: number, limit: number) {
    let attributeList: any[];
    try {
      const query = `SELECT 
        id,name, code, is_deleted, created_date, updated_date
        FROM Attribute_groups ps 
        order by id DESC 
        OFFSET ${offset} rows
        FETCH next ${limit} rows only`;
      const attributeGr: AttributeGroupDto[] =
        await this.productDatasource.query(query);

      attributeList = attributeGr.map((attGr) => {
        return attGr;
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
  async createAttributeGr(payload: CreateAttributeGrDto) {
    try {
      const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');
      const attGrId = await this.findAttribute(payload.code);

      if (attGrId) {
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
    if (!atb_gr) throw new NotFoundException(`attribute group not found`);
    const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');
    if (payload.name == '' || payload.name == undefined) {
      payload.name = atb_gr.name;
    }
    try {
      const query = `UPDATE Attribute_groups SET name ='${payload.name}', is_deleted = '${payload.is_deleted}', updated_date = '${currentDay}'  WHERE code = '${atb_gr.code}'`;
      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Update attribute success',
      };
    } catch (err) {
      console.log(err);
    }
  }

  async createAtbAtbGr(payload: CreateAttributeAtbGrDto) {
    const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');
    const atbGroup = await this.findAttributeGroup(
      payload.attribute_group_code,
    );

    const atb = await this.findAttribute(payload.attribute_code);

    if (!atbGroup)
      throw new NotFoundException(`attribute group not found `);
    if (!atb) throw new NotFoundException(`Attribute not found `);
    try {
      const query = `INSERT INTO [Attribute_attribute_groups] (attribute_id,attribute_name, attribute_code,attribute_group_id,attribute_group_name,attribute_group_code,is_deleted, created_date, updated_date, created_by, updated_by) VALUES (${atb.id},'${atb.name}', '${atb.code}',${atbGroup.id},'${atbGroup.name}','${atbGroup.code}',0, '${currentDay}', '${currentDay}', 0, 0)`;
      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Create attribute group success',
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findAtbAtbGr(id: number) {
    const attributeAtbGr = await this.productDatasource.query(
      `SELECT * FROM Attribute_attribute_groups WHERE id = ${id}`,
    );
    if (!attributeAtbGr)
      throw new NotFoundException(`Attribute not found `);
    return attributeAtbGr[0];
  }
  async updateAtbAtbGr(id: number, payload: UpdateAttributeAtbGrDto) {
    const currentDay = dayjs(Date()).format('YYYY/MM/DD HH:mm:ss');

    const atbAtbGr = await this.findAtbAtbGr(id);

    if (!atbAtbGr) throw new NotFoundException(`Attribute not found `);
    try {
      const atb = await this.findAttribute(
        payload.attribute_code || atbAtbGr.attribute_code,
      );
      const atbGr = await this.findAttributeGroup(
        payload.attribute_group_code || atbAtbGr.attribute_group_code,
      );
      const is_deleted = payload.is_deleted || atbAtbGr.is_deleted;

      const query = `UPDATE Attribute_attribute_groups SET attribute_id = ${atb.id},attribute_code = '${atb.code}', attribute_name= '${atb.name}', attribute_group_id = ${atbGr.id},attribute_group_name = '${atbGr.name}', attribute_group_code = '${atbGr.code}', is_deleted = '${is_deleted}', updated_date = '${currentDay}' WHERE id = ${id}`;

      await this.productDatasource.query(query);
      return {
        status: HttpStatus.OK,
        message: 'Update success',
      };
    } catch (err) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Update failed',
      };
    }
  }
}
