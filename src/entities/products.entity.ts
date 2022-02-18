import { DiscountsEntity } from 'src/entities/discounts.entity';
import { OrdersEntity } from 'src/entities/orders.entity';
import { Section } from 'src/config/enum/section.enum';
import { Size } from 'src/config/enum/size.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  category: Section;

  @Column()
  price: number;

  @ManyToMany(() => OrdersEntity, (order) => order.products)
  orders: OrdersEntity[];

  @ManyToOne(() => DiscountsEntity, (discount) => discount.products)
  discount: DiscountsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
