import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/config/enum/role.enum';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.FIRST_NAME_VALID })
  firstName: string;

  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.LAST_NAME_VALID })
  lastName: string;

  @IsNotEmpty()
  @Matches(RegExHelper.username, { message: MessageHelper.USERNAME_VALID })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  @Matches(RegExHelper.cpf, { message: MessageHelper.CPF_VALID })
  cpf: string;

  @IsNotEmpty()
  @Matches(RegExHelper.telephone, { message: MessageHelper.TELEPHONE_VALID })
  telephone: string;

  @IsOptional()
  gender: string;

  @IsEnum(Role)
  role: Role;
}
