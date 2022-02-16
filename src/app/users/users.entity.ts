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
import { Role } from '../../config/enum/role.enum';
import { OrdersEntity } from '../orders/orders.entity';
import { AddressesEntity } from '../addresses/addresses.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', length: '50' })
  lastName: string;

  @Column({ length: '100', unique: true })
  username: string;

  @Column({ length: '255' })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ length: '255', unique: true })
  cpf: string;

  @Column({ length: '100' })
  telephone: string;

  @Column({ length: '50', nullable: true })
  gender: string;

  @OneToOne(() => AddressesEntity, (address) => address.user, { eager: true })
  address: AddressesEntity;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

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
