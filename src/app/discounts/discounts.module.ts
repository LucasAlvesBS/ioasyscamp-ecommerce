import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController } from './discounts.controller';
import { DiscountsEntity } from './discounts.entity';
import { DiscountsService } from './discounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountsEntity])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
