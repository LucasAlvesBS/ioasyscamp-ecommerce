import { ProductsEntity } from 'src/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'discounts' })
export class DiscountsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  percentage: string;

  @Column()
  active: boolean;

  @OneToMany(() => ProductsEntity, (product) => product.discount, {
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
