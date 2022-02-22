import { IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateStockDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.STOCK_DESCRIPTION_VALID })
  description: string;
}
