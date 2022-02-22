import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DiscountsEntity } from './discounts.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountsEntity)
    private readonly discountRepository: Repository<DiscountsEntity>,
  ) {}

  async findAllDiscounts() {
    return await this.discountRepository.find({
      select: ['id', 'percentage'],
    });
  }

  async findOneDiscount(
    conditions: FindConditions<DiscountsEntity>,
    options?: FindOneOptions<DiscountsEntity>,
  ) {
    try {
      return await this.discountRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createDiscount(data: CreateDiscountDto) {
    const discount = this.discountRepository.create(data);
    return await this.discountRepository.save(discount);
  }

  async updateDiscount(id: string, data: UpdateDiscountDto) {
    const discount = await this.discountRepository.findOneOrFail({ id });
    this.discountRepository.merge(discount, data);
    return await this.discountRepository.save(discount);
  }

  async deleteDiscount(id: string) {
    await this.discountRepository.findOneOrFail({ id });
    this.discountRepository.softDelete({ id });
  }
}
