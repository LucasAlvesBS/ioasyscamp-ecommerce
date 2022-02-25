import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksEntity } from './stocks.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StocksEntity)
    private readonly stockRepository: Repository<StocksEntity>,
  ) {}

  async findAllStocks() {
    return await this.stockRepository.find();
  }

  async findOneStock(conditions: FindConditions<StocksEntity>) {
    try {
      return await this.stockRepository.findOneOrFail(conditions, {
        select: ['id', 'description', 'availableQuantity'],
      });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createStock(data: CreateStockDto) {
    const stock = this.stockRepository.create(data);
    return await this.stockRepository.save(stock);
  }

  async updateStock(id: string, data: UpdateStockDto) {
    try {
      const stock = await this.stockRepository.findOneOrFail({ id });
      this.stockRepository.merge(stock, data);
      return await this.stockRepository.save(stock);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteStock(id: string) {
    try {
      await this.stockRepository.findOneOrFail({ id });
      this.stockRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
