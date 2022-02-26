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
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksService } from './stocks.service';

@Controller('ecommerce/stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get()
  async findAllStocks() {
    return await this.stockService.findAllStocks();
  }

  @Get(':id')
  async findOneStock(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.stockService.findOneStock({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createStock(@Body() body: CreateStockDto) {
    return await this.stockService.createStock(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateStock(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateStockDto,
  ) {
    return await this.stockService.updateStock(id, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStock(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.stockService.deleteStock(id);
  }
}
