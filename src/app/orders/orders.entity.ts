import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsEntity } from '../products/products.entity';
import { UsersEntity } from '../users/users.entity';
import { Payment } from '../../config/enum/payment.enum';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Payment })
  payment: Payment;

  @Column({ name: 'total_cost' })
  totalCost: number; // talvez tenha que tirar

  @ManyToOne(() => UsersEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToMany(() => ProductsEntity, (products) => products.orders, {
    eager: true,
  })
  @JoinTable({
    name: 'orders_products',
    joinColumns: [{ name: 'order_id' }],
    inverseJoinColumns: [{ name: 'product_id' }],
  })
  products: ProductsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
