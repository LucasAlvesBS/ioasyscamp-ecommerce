import { IsEnum, IsOptional, Min } from 'class-validator';
import { Section } from '../../../config/enum/section.enum';
import { Size } from '../../../config/enum/size.enum';
import { MessageHelper } from 'src/helpers/message.helper';

export class UpdateProductDto {
  @IsOptional()
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
