import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductsEntity } from 'src/app/products/products.entity';
import { StocksEntity } from 'src/app/stocks/stocks.entity';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { Payment } from '../../../config/enum/payment.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(Payment, { message: MessageHelper.PAYMENT_VALID })
  payment: Payment;

  @IsNotEmpty()
  user: UsersEntity;

  @IsNotEmpty()
  stock: StocksEntity;

  @IsNotEmpty()
  products: ProductsEntity[];
}
