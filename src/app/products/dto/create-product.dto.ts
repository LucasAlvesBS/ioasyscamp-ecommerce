import { IsEnum, IsNotEmpty, Min } from 'class-validator';
import { StocksEntity } from 'src/app/stocks/stocks.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { Section } from '../../../config/enum/section.enum';
import { Size } from '../../../config/enum/size.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
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
  stock: StocksEntity;
}
