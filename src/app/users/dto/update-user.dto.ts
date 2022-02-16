import { IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdateUserDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.FIRST_NAME_VALID })
  firstName: string;

  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.LAST_NAME_VALID })
  lastName: string;
}
