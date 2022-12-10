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
  created_date: string;

  @Column('datetime')
  updated_date: string;

  @Column('bigint')
  created_by: number;

  @Column('bigint')
  updated_by: number;

  @Column('timestamp')
  _timestamp: any;
}
