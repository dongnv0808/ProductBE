import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs'
@Entity({
  name: 'ATTRIBUTES',
})
export class AttributesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('nvarchar')
  name: string;

  @Column('nvarchar')
  code: string;

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
