import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DiscountsEntity } from '../discounts/discounts.entity';
import { OrdersEntity } from '../orders/orders.entity';
import { Section } from '../../config/enum/section.enum';
import { Size } from '../../config/enum/size.enum';
import { StocksEntity } from '../stocks/stocks.entity';

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255' })
  name: string;

  @Column()
  description: string;

  @Column()
  size: Size;

  @Column({ length: 100 })
  color: string;

  @Column({ type: 'enum', enum: Section })
  section: Section;

  @Column()
  price: number;

  @ManyToOne(() => DiscountsEntity, (discount) => discount.products, {
    onDelete: 'SET NULL', // olhar direito o SET NULL em discount
  })
  @JoinColumn({ name: 'discount_id' })
  discount: DiscountsEntity;

  @ManyToOne(() => StocksEntity, (stock) => stock.products, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'stock_id' })
  stock: StocksEntity;

  @ManyToMany(() => OrdersEntity, (orders) => orders.products)
  orders: OrdersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
