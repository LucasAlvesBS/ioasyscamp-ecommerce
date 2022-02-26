import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressesEntity } from './addresses.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesEntity)
    private readonly addressRepository: Repository<AddressesEntity>,
  ) {}

  async findAddress(
    conditions: FindConditions<AddressesEntity>,
    options?: FindOneOptions<AddressesEntity>,
  ) {
    try {
      return await this.addressRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createAddress(data: CreateAddressDto) {
    try {
      const address = this.addressRepository.create(data);
      return await this.addressRepository.save(address);
    } catch (error) {
      throw new BadRequestException(MessageHelper.BAD_REQUEST);
    }
  }

  async updateAddress(id: string, data: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.findOneOrFail({ id });
      this.addressRepository.merge(address, data);
      return await this.addressRepository.save(address);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteAddress(id: string) {
    try {
      await this.addressRepository.findOneOrFail({ id });
      this.addressRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
