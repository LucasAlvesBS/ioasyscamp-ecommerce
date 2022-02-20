import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Matches(RegExHelper.name, { message: MessageHelper.FIRST_NAME_VALID })
  firstName: string;

  @IsOptional()
  @Matches(RegExHelper.name, { message: MessageHelper.LAST_NAME_VALID })
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(RegExHelper.cpf, { message: MessageHelper.CPF_VALID })
  cpf: string;

  @IsOptional()
  @Matches(RegExHelper.telephone, { message: MessageHelper.TELEPHONE_VALID })
  telephone: string;

  @IsOptional()
  gender: string;
}
