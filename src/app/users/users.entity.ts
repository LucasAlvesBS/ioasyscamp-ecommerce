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
import { Role } from '../../config/enum/role.enum';
import { dataEncryption } from '../../helpers/crypto.helper';
import { CommentsEntity } from '../comments/comments.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: '255', transformer: dataEncryption })
  firstName: string;

  @Column({ name: 'last_name', length: '255', transformer: dataEncryption })
  lastName: string;

  @Column({ length: '255', unique: true, transformer: dataEncryption })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ length: '255', unique: true, transformer: dataEncryption })
  cpf: string;

  @Column({ length: '255', transformer: dataEncryption })
  telephone: string;

  @Column({ length: '255', nullable: true, transformer: dataEncryption })
  gender: string;

  @Column({ name: 'orders_made' })
  ordersMade: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToOne(() => AddressesEntity, (address) => address.user, { eager: true })
  address: AddressesEntity;

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user, { eager: true })
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
