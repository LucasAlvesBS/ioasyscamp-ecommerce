import { IsNotEmpty } from 'class-validator';
import { ProductsEntity } from 'src/app/products/products.entity';
import { UsersEntity } from 'src/app/users/users.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user: UsersEntity;

  @IsNotEmpty()
  product: ProductsEntity;
}
