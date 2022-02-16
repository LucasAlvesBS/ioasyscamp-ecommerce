import { IsEnum, IsNotEmpty, Matches, Min } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { Section } from '../../../config/enum/section.enum';
import { Size } from '../../../config/enum/size.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.PRODUCT_NAME_VALID })
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  size: Size;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsEnum(Section, { message: MessageHelper.SECTION_VALID })
  category: Section;

  @IsNotEmpty()
  @Min(0)
  price: number;
}
