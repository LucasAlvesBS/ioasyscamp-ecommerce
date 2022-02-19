import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksEntity } from './stocks.entity';
import { StocksService } from './stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([StocksEntity])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
