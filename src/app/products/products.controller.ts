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
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../../config/enum/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@SkipThrottle(true)
@Controller('ecommerce/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.createProduct(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.productService.deleteProduct(id);
  }
}
