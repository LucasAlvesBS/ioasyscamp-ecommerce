import { IsEnum, IsNotEmpty } from 'class-validator';
import { Payment } from 'src/config/enum/payment.enum';
import { ProductsEntity } from 'src/entities/products.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { MessageHelper } from 'src/helpers/message.helper';

export class CreateOrderDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(Payment, { message: MessageHelper.PAYMENT_VALID })
  paymentMethods: Payment;

  @IsNotEmpty()
  totalCost: number;

  @IsNotEmpty()
  user: UsersEntity;

  @IsNotEmpty()
  products: ProductsEntity[];
}
