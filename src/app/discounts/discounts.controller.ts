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
import { Role } from '../../config/enum/role.enum';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('ecommerce/discounts')
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @Get()
  async findAllDiscounts() {
    return await this.discountService.findAllDiscounts();
  }

  @Get(':id')
  async findOneDiscount(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.discountService.findOneDiscount({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createDiscount(@Body() body: CreateDiscountDto) {
    return await this.discountService.createDiscount(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateDiscount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDiscountDto,
  ) {
    return await this.discountService.updateDiscount(id, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiscount(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.discountService.deleteDiscount(id);
  }
}
