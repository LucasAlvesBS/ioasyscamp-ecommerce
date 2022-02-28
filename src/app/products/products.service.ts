import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
  ) {}

  async findAllProducts() {
    return await this.productRepository.find({
      select: ['id', 'name', 'description', 'size', 'color', 'section'],
    });
  }

  async findOneProduct(
    conditions: FindConditions<ProductsEntity>,
    options?: FindOneOptions<ProductsEntity>,
  ) {
    try {
      return await this.productRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createProduct(data: CreateProductDto) {
    try {
      const product = this.productRepository.create(data);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(MessageHelper.BAD_REQUEST);
    }
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOneOrFail({ id });
      this.productRepository.merge(product, data);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productRepository.findOneOrFail({ id });
      this.productRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
