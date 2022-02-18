import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsEntity } from 'src/entities/discounts.entity';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountsEntity])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
