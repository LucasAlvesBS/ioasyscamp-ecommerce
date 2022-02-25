import { IsEnum, IsNotEmpty } from 'class-validator';
import { Payment } from '../../../config/enum/payment.enum';
import { MessageHelper } from 'src/helpers/message.helper';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(Payment, { message: MessageHelper.PAYMENT_VALID })
  payment: Payment;
}
