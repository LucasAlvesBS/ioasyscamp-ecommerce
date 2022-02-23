import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from '../orders/orders.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity({ name: 'stocks' })
export class StocksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ name: 'available_quantity' })
  availableQuantity: number;

  @Column({ name: 'expected_profit' })
  expectedProfit: number;

  @OneToMany(() => OrdersEntity, (orders) => orders.stock)
  orders: OrdersEntity[];

  @OneToMany(() => ProductsEntity, (products) => products.stock)
  products: ProductsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
