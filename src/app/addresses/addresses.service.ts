import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressesEntity } from './addresses.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesEntity)
    private readonly addressRepository: Repository<AddressesEntity>,
  ) {}

  async createAddress(data: CreateAddressDto) {
    const address = this.addressRepository.create(data);
    return await this.addressRepository.save(address);
  }

  async updateAddress(id: string, data: UpdateAddressDto) {
    const address = await this.addressRepository.findOneOrFail({ id });
    this.addressRepository.merge(address, data);
    return await this.addressRepository.save(address);
  }
}
