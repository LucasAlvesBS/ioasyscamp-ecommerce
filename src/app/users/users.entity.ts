import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { OrdersEntity } from '../orders/orders.entity';
import { AddressesEntity } from '../addresses/addresses.entity';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: '100' })
  firstName: string;

  @Column({ name: 'last_name', length: '100' })
  lastName: string;

  @Column({ length: '255' })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ length: '255', unique: true })
  cpf: string;

  @Column({ length: '100' })
  telephone: string;

  @Column({ length: '100', nullable: true })
  gender: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToOne(() => AddressesEntity, (address) => address.user, { eager: true })
  address: AddressesEntity;

  @OneToMany(() => OrdersEntity, (order) => order.user, { eager: true })
  orders: OrdersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  hashedPassword() {
    this.password = hashSync(this.password, 10);
  }
}
