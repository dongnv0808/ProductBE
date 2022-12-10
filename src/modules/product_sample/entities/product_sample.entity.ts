import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'PRODUCT_SAMPLE',
})
export class ProductSample {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('nvarchar')
  code: string;
  
  @Column('nvarchar')
  attribute: string;

  @Column('nvarchar')
  attribute_value: string;

  @Column('nvarchar')
  source: string;
}
