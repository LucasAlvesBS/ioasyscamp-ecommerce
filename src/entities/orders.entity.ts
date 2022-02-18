import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Payment } from 'src/config/enum/payment.enum';
import { ProductsEntity } from 'src/entities/products.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: Payment })
  paymentMethods: Payment;

  @Column()
  totalCost: number; // talvez tenha que tirar

  @ManyToOne(() => UsersEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  user: UsersEntity;

  @ManyToMany(() => ProductsEntity, (product) => product.orders, {
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
