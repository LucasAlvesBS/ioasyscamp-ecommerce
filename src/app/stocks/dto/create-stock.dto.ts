import { IsNotEmpty } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  description: string;
}
