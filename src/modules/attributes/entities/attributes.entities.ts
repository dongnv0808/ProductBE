import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('datetime')
  created_date: string;

  @Column('datetime')
  updated_date: string;

  @Column('nvarchar', {default: 0})
  created_by: string;

  @Column('nvarchar', {default: 0})
  updated_by: string;

  @Column('timestamp')
  _timestamp: any;
}
