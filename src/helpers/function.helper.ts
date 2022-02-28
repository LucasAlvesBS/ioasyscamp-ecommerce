import {
  BadRequestException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const verifyDuplicate = (role: UsersEntity) => {
  if (role) {
    throw new BadRequestException(MessageHelper.INFORMATIONS_INVALID);
  }
};

export const verifyTokenId = (req: any, user: UsersEntity) => {
  if (req.id !== user.id) {
    throw new ForbiddenException(MessageHelper.FORBIDDEN);
  }
};

export const verifyProductsQuantity = (order: any) => {
  if (order === 0) {
    throw new UnprocessableEntityException(MessageHelper.UNPROCESSABLE_ENTITY);
  }
};
