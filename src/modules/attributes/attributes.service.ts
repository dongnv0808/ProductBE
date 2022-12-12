import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AttributesDto } from './dto/attributes.dto';
import * as dayjs from 'dayjs'
import { UpdateAttribute } from './dto/update-attribute.dto';
@Injectable()
export class AttributesService {
    constructor (
        @InjectDataSource('productDatasource')
        private readonly productDatasource: DataSource
    ){}
    async showAll(offset:number, limit:number) {
        let  attributeList: any[];
        try {
        const query = `SELECT 
        id,name, code 
        FROM Attributes ps 
        order by id DESC 
        OFFSET ${offset} rows
        FETCH next ${limit} rows only`
        const attributes:AttributesDto[] =  await this.productDatasource.query(query);
        // let currentDay = dayjs(Date()).format("DD/MM/YYYY HH:mm:ss");
        attributeList = attributes.map((att)=> {
            return att
        // let result =  `INSERT INTO [Attributes](name, code, is_deleted, created_date, updated_date, created_by, updated_by) VAlUES(${att.name}, ${att.code}, 0, ${currentDay},${currentDay},0,0);`; 
        // return this.productDatasource.query(result)
        })
        return {
            status: HttpStatus.OK,
            message: 'Get all attributes success', 
            attributeList
            };
    }
    catch(err) {
        console.log(err)
    }

    }
    async getAttributeById (code: string){
       const attribute = await this.productDatasource.query(`SELECT * FROM Attributes WHERE code = '${code}'`)
        if(!attribute)  throw new NotFoundException(`Không tìm thấy thuộc tính `)
        return attribute
    }

    async createAttribute(payload : {name, code, is_deleted, created_date, updated_date, created_by, updated_by}) {
        try {
            const  currentDay = dayjs(Date()).format("DD/MM/YYYY HH:mm:ss");
            const attId = await this.getAttributeById(payload.code)      

            if(attId.length > 0) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: ' Attribute already exist', 
                    };
            }
            else {
                const query = `INSERT INTO [Attributes] (name, code,is_deleted, created_date, updated_date, created_by, updated_by) VALUES ('${payload.name}', '${payload.code}', 0, '${currentDay}', '${currentDay}', 0, 0)`;
                const attribute = await this.productDatasource.query(query)
                return {
                    status: HttpStatus.OK,
                    message: 'Create attribute success', 
                    attribute
                    };
            }
        }
        catch (err) {
            console.log(err)
        }
        
 
    }
    async updateAttribute(code: string, payload: UpdateAttribute) {
        const atb  = await this.getAttributeById(code)
        if(!atb) throw new NotFoundException(`Không tìm thấy thuộc tính `);
        
        try {
            const query = `UPDATE Attributes SET name ='${payload.name}', is_deleted = '${payload.is_deleted}' WHERE code = '${atb[0].code}'`
            
            const newAttribute = await this.productDatasource.query(query)
        }
        catch (err) {
            console.log(err)
        }
        return {
            status: HttpStatus.OK,
                    message: 'Update attribute success',              
            }
    }

}
