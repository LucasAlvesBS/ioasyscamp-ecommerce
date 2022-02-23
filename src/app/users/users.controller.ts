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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../config/enum/role.enum';
import { UsersService } from './users.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('ecommerce/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.userService.getProfile({ id });
  }

  @Post('register')
  async createProfile(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register/admin')
  async createAdmin(@Body() body: CreateUserDto) {
    return await this.userService.createAdmin(body);
  }

  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register/manager')
  async createManager(@Body() body: CreateUserDto) {
    return await this.userService.createAdmin(body);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateProfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('password/:id')
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return await this.userService.updateUserPassword(id, body);
  }

  @Roles(Role.Admin, Role.User, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }
}
