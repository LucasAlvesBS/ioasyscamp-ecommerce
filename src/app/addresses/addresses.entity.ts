import { dataEncryption } from '../../helpers/crypto.helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'addresses' })
export class AddressesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255', transformer: dataEncryption })
  state: string;

  @Column({ length: '255', transformer: dataEncryption })
  city: string;

  @Column({ length: '255', transformer: dataEncryption })
  address1: string;

  @Column({ length: '255', nullable: true, transformer: dataEncryption })
  address2: string;

  @Column({ name: 'zip_code', length: '255', transformer: dataEncryption })
  zipCode: string;

  @OneToOne(() => UsersEntity, (user) => user.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
