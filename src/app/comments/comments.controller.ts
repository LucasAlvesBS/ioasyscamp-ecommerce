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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('ecommerce/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  async findAllComments() {
    return await this.commentService.findAllComments();
  }

  @Get(':id')
  async findOneComment(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.commentService.findOneComment({ id });
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return await this.commentService.createComment(body);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateComment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(id, body);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.commentService.deleteComment(id);
  }
}
