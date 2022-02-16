import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('api/vi/addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAddress(@Body() body: CreateAddressDto) {
    return await this.addressService.createAddress(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateAddress(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, body);
  }
}
