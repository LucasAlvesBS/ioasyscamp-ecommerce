import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ProductsEntity } from 'src/app/products/products.entity';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  @IsArray()
  products: ProductsEntity[];
}
