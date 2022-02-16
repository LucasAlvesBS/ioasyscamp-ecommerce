import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async getProfile(
    conditions: FindConditions<UsersEntity>,
    //options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions, {
        select: ['id', 'firstName', 'lastName', 'email'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
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
    if (verifyUser) {
      throw new HttpException(
        MessageHelper.EMAIL_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ id });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    await this.userRepository.findOneOrFail({ id });
    this.userRepository.softDelete({ id });
  }
}
