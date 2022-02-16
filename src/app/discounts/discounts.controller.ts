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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('api/vi/discounts')
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @Get()
  async findAllDiscounts() {
    return await this.discountService.findAllDiscounts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDiscount(@Body() body: CreateDiscountDto) {
    return await this.discountService.createDiscount(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateDiscount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDiscountDto,
  ) {
    return await this.discountService.updateDiscount(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiscount(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.discountService.deleteDiscount(id);
  }
}
