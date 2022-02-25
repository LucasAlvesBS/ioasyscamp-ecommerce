import { IsEnum, IsOptional, Matches, Min } from 'class-validator';
import { Section } from '../../../config/enum/section.enum';
import { Size } from '../../../config/enum/size.enum';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdateProductDto {
  @IsOptional()
  @Matches(RegExHelper.product, { message: MessageHelper.PRODUCT_NAME_VALID })
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(Size, { message: MessageHelper.SIZE_VALID })
  size: Size;

  @IsOptional()
  color: string;

  @IsOptional()
  @IsEnum(Section, { message: MessageHelper.SECTION_VALID })
  section: Section;

  @IsOptional()
  @Min(0)
  price: number;
}
