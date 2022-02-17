import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/config/enum/role.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('api/v1/orders')
@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  async findOneOrder(@Param('id') id: string) {
    return await this.orderService.findOneOrder({ id });
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.orderService.deleteOrder(id);
  }
}
