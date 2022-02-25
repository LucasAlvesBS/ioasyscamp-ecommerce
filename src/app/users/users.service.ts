import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Role } from 'src/config/enum/role.enum';
import { verifyDuplicate } from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async getProfile(conditions: FindConditions<UsersEntity>) {
    try {
      return await this.userRepository.findOneOrFail(conditions, {
        select: ['id', 'firstName', 'lastName', 'email', 'ordersMade', 'role'],
      });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async checkUser(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createUser(data: CreateUserDto) {
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({
      email,
    });

    verifyDuplicate(verifyUser);

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async createAdmin(data: CreateUserDto) {
    const { email } = data;
    const verifyAdmin = await this.userRepository.findOne({
      email,
    });

    verifyDuplicate(verifyAdmin);

    const admin: UsersEntity = this.userRepository.create(data);
    admin.role = Role.Admin;
    return await this.userRepository.save(admin);
  }

  async createManager(data: CreateUserDto) {
    const { email } = data;
    const verifyManager = await this.userRepository.findOne({
      email,
    });

    verifyDuplicate(verifyManager);

    const manager: UsersEntity = this.userRepository.create(data);
    manager.role = Role.Manager;
    return await this.userRepository.save(manager);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      this.userRepository.merge(user, data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async updateUserPassword(id: string, data: UpdateUserPasswordDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      const password = hashSync(data.password, 10);
      data = {
        ...data,
        password,
      };
      this.userRepository.merge(user, data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userRepository.findOneOrFail({ id });
      this.userRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
