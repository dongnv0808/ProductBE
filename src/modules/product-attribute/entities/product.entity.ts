import * as dayjs from 'dayjs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'PRODUCT',
})
export class ProductAtb {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('nvarchar')
  name: string;

  @Column('nvarchar')
  code: string;

  @Column('nvarchar')
  state: string;

  @Column('nvarchar')
  status: string;

  @Column('bit',{default: 0})
  is_deleted: number;

  @Column('datetime', {default: dayjs(Date()).format("DD/MM/YYYY HH:mm:ss")})
  created_date: string;

  @Column('datetime', {default: dayjs(Date()).format("DD/MM/YYYY HH:mm:ss")})
  updated_date: string;

  @Column('nvarchar', {default: 0})
  created_by: string;

  @Column('nvarchar', {default: 0})
  updated_by: string;

  @Column('timestamp')
  _timestamp: any;
}
