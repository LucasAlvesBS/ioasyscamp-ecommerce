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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':name')
  async findOneProduct(@Param('name') name: string) {
    return this.productService.findOneProduct({ name });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.createProduct(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.productService.deleteProduct(id);
  }
}
