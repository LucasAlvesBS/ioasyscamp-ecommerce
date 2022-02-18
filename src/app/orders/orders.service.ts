import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from 'src/entities/orders.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
  ) {}

  async findOneOrder(
    conditions: FindConditions<OrdersEntity>,
    options?: FindOneOptions<OrdersEntity>,
  ) {
    try {
      return await this.orderRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createOrder(data: CreateOrderDto) {
    const order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    const discount = await this.orderRepository.findOneOrFail({ id });
    this.orderRepository.merge(discount, data);
    return await this.orderRepository.save(discount);
  }

  async deleteOrder(id: string) {
    await this.orderRepository.findOneOrFail({ id });
    this.orderRepository.softDelete({ id });
  }
}
