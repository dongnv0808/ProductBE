import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'PRODUCT',
})
export class Product {
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

  @Column('bit')
  is_deleted: number;

  @Column('datetime')
  created_update: string;

  @Column('datetime')
  updated_date: string;

  @Column('datetime')
  created_by: string;

  @Column('nvarchar')
  updated_by: string;

  @Column('timestamp')
  _timestamp: any;
}
