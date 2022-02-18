import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { UsersEntity } from 'src/entities/users.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateAddressDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.STATE_VALID })
  state: string;

  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.CITY_VALID })
  city: string;

  @IsNotEmpty()
  address1: string;

  @IsOptional()
  address2: string;

  @IsNotEmpty()
  @Matches(RegExHelper.zipCode, { message: MessageHelper.ZIP_CODE_VALID })
  zipCode: string;

  @IsNotEmpty()
  user: UsersEntity;
}
