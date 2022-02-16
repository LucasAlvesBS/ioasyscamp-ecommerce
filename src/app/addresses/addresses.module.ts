import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { AddressesEntity } from './addresses.entity';
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressesEntity])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
