import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async buy(@Body() body: CreateOrderDto) {
    return await this.orderService.buy(body);
  }
}
