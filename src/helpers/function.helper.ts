import { BadRequestException } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const verifyDuplicate = (role: UsersEntity) => {
  if (role) {
    throw new BadRequestException(MessageHelper.INFORMATIONS_INVALID);
  }
};
