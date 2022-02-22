import { IsEnum, IsNotEmpty, Matches, Min } from 'class-validator';
import { StocksEntity } from 'src/app/stocks/stocks.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { Section } from '../../../config/enum/section.enum';
import { Size } from '../../../config/enum/size.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @Matches(RegExHelper.product, { message: MessageHelper.PRODUCT_NAME_VALID })
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty() // Colocar decorator IsEnum e a mensagem do helper
  @IsEnum(Size, { message: MessageHelper.SIZE_VALID })
  size: Size;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsEnum(Section, { message: MessageHelper.SECTION_VALID })
  section: Section;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Min(0)
  productsQuantity: number;

  @IsNotEmpty()
  stock: StocksEntity;
}
