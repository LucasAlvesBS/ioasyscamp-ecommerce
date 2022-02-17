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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return await this.userService.getProfile({ username });
  }

  @Post('register')
  async createProfile(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
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
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }
}
