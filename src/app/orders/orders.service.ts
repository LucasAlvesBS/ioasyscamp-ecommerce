import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersEntity } from './orders.entity';

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
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createOrder(data: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(data);
      order.orderQuantity = order.products.length;
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new BadRequestException(MessageHelper.BAD_REQUEST);
    }
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    try {
      const discount = await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.merge(discount, data);
      return await this.orderRepository.save(discount);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
