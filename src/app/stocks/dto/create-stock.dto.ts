import { IsArray, IsNotEmpty, Matches } from 'class-validator';
import { ProductsEntity } from 'src/app/products/products.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateStockDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.STOCK_NAME_VALID })
  name: string;

  //@IsNotEmpty()
  //availableQuantity: number;

  @IsNotEmpty()
  @IsArray()
  products: ProductsEntity[];
}
