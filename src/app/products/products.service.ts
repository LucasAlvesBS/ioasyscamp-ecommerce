import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      select: [
        'id',
        'name',
        'size',
        'color',
        'section',
        'price',
        'productsQuantity',
      ],
    });
  }

  async findOneProduct(
    conditions: FindConditions<ProductsEntity>,
    options?: FindOneOptions<ProductsEntity>,
  ) {
    try {
      return await this.productRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createProduct(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productRepository.findOneOrFail({ id });
    this.productRepository.merge(product, data);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    await this.productRepository.findOneOrFail({ id });
    this.productRepository.softDelete({ id });
  }
}
