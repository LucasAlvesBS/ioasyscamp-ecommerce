import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/entities/addresses.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesEntity)
    private readonly addressRepository: Repository<AddressesEntity>,
  ) {}

  async findOneAddress(
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
    const address = this.addressRepository.create(data);
    return await this.addressRepository.save(address);
  }

  async updateAddress(id: string, data: UpdateAddressDto) {
    const address = await this.addressRepository.findOneOrFail({ id });
    this.addressRepository.merge(address, data);
    return await this.addressRepository.save(address);
  }

  async deleteAddress(id: string) {
    await this.addressRepository.findOneOrFail({ id });
    this.addressRepository.softDelete({ id });
  }
}
