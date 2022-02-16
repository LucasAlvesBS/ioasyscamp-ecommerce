import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
  ) {}

  async buy(data: CreateOrderDto) {
    const order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }
}
