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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorator/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../config/enum/role.enum';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return await this.userService.checkUser({ username });
  }

  @Post('register')
  async createProfile(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Patch(':username')
  async updateProfile(
    @Param('username') username: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.updateUser(username, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProfile(@Param('username') username: string) {
    await this.userService.deleteUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }
}
