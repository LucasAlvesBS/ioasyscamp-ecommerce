import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsEntity } from '../products/products.entity';

@Entity({ name: 'discounts' })
export class DiscountsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  percentage: number;

  @Column()
  active: boolean;

  @OneToMany(() => ProductsEntity, (products) => products.discount, {
    eager: true,
  })
  products: ProductsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
