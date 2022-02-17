import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/config/enum/role.enum';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('api/vi/addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOneAddres(@Param('id') id: string) {
    return await this.addressService.findOneAddress({ id });
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createAddress(@Body() body: CreateAddressDto) {
    return await this.addressService.createAddress(body);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateAddress(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, body);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.addressService.deleteAddress(id);
  }
}
