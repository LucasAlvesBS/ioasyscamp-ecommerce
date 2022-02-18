import { IsArray, IsBoolean, IsNotEmpty, Matches } from 'class-validator';
import { ProductsEntity } from 'src/app/products/products.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateDiscountDto {
  @IsNotEmpty()
  @Matches(RegExHelper.percentage, { message: MessageHelper.PERCENTAGE_VALID })
  percentage: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsArray()
  products: ProductsEntity[];
}
